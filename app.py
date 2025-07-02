from flask import Flask, render_template, Response
import cv2
import threading
import time

app = Flask(__name__)

# 전역 변수로 웹캠 객체와 프레임 저장
camera = None
frame = None
camera_lock = threading.Lock()

def init_camera():
    """웹캠 초기화"""
    global camera
    camera = cv2.VideoCapture(0)  # 기본 웹캠 (0번)
    if not camera.isOpened():
        print("웹캠을 열 수 없습니다.")
        return False
    return True

def generate_frames():
    """웹캠 프레임을 생성하는 제너레이터"""
    global frame, camera
    
    while True:
        with camera_lock:
            if camera is None or not camera.isOpened():
                break
                
            success, frame = camera.read()
            if not success:
                break
            else:
                # 프레임을 JPEG로 인코딩
                ret, buffer = cv2.imencode('.jpg', frame)
                if not ret:
                    continue
                    
                # 스트리밍을 위한 바이트 데이터로 변환
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        
        time.sleep(0.03)  # 약 30 FPS

@app.route('/')
def index():
    """메인 페이지"""
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    """비디오 스트림 엔드포인트"""
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/start_camera')
def start_camera():
    """웹캠 시작"""
    global camera
    if camera is None or not camera.isOpened():
        if init_camera():
            return {'status': 'success', 'message': '웹캠이 시작되었습니다.'}
        else:
            return {'status': 'error', 'message': '웹캠을 시작할 수 없습니다.'}
    return {'status': 'success', 'message': '웹캠이 이미 실행 중입니다.'}

@app.route('/stop_camera')
def stop_camera():
    """웹캠 중지"""
    global camera
    with camera_lock:
        if camera is not None:
            camera.release()
            camera = None
    return {'status': 'success', 'message': '웹캠이 중지되었습니다.'}

@app.route('/camera_status')
def camera_status():
    """웹캠 상태 확인"""
    global camera
    if camera is not None and camera.isOpened():
        return {'status': 'running'}
    else:
        return {'status': 'stopped'}

if __name__ == '__main__':
    # 웹캠 자동 시작 제거 - 사용자가 직접 시작하도록 함
    app.run(debug=True, host='0.0.0.0', port=5000) 