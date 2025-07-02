# 📹 실시간 웹캠 스트리밍 Flask 앱

웹캠을 실시간으로 스트리밍하는 Flask 웹 애플리케이션입니다.

## 🚀 기능

- 실시간 웹캠 스트리밍
- 웹캠 시작/중지 제어
- 반응형 웹 인터페이스
- 실시간 상태 모니터링
- 에러 처리 및 사용자 피드백

## 📋 요구사항

- Python 3.7+
- 웹캠 (내장 또는 외장)
- Windows/Linux/macOS

## 🛠️ 설치 및 실행

### 1. 가상환경 활성화
```bash
# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate
```

### 2. 의존성 설치
```bash
pip install -r requirements.txt
```

### 3. 애플리케이션 실행
```bash
python app.py
```

### 4. 브라우저에서 접속
```
http://localhost:5000
```

## 🎯 사용법

1. **웹캠 시작**: "🎥 웹캠 시작" 버튼을 클릭하여 스트리밍을 시작합니다.
2. **웹캠 중지**: "⏹️ 웹캠 중지" 버튼을 클릭하여 스트리밍을 중지합니다.
3. **상태 확인**: 페이지 하단에서 현재 웹캠 상태를 확인할 수 있습니다.

## 📁 프로젝트 구조

```
facechecker/
├── app.py              # Flask 애플리케이션 메인 파일
├── requirements.txt    # Python 의존성 목록
├── templates/
│   └── index.html     # 웹 인터페이스 템플릿
├── static/
│   ├── css/
│   │   └── style.css  # 스타일시트
│   └── js/
│       └── app.js     # JavaScript 파일
└── README.md          # 프로젝트 설명서
```

## 🔧 API 엔드포인트

- `GET /` - 메인 페이지
- `GET /video_feed` - 웹캠 스트림
- `GET /start_camera` - 웹캠 시작
- `GET /stop_camera` - 웹캠 중지
- `GET /camera_status` - 웹캠 상태 확인

## 🎨 기술 스택

- **Backend**: Flask, OpenCV
- **Frontend**: HTML5, CSS3, JavaScript
- **비디오 처리**: OpenCV-Python
- **웹 프레임워크**: Flask

## ⚠️ 주의사항

- 웹캠 권한이 필요합니다.
- 브라우저에서 웹캠 접근을 허용해야 합니다.
- HTTPS 환경에서는 추가 설정이 필요할 수 있습니다.

## 🐛 문제 해결

### 웹캠이 열리지 않는 경우
1. 다른 애플리케이션에서 웹캠을 사용 중인지 확인
2. 웹캠 드라이버가 올바르게 설치되었는지 확인
3. 웹캠 인덱스를 변경해보세요 (app.py의 `cv2.VideoCapture(0)` 부분)

### 스트리밍이 끊기는 경우
1. 네트워크 연결 상태 확인
2. 브라우저 캐시 삭제
3. 페이지 새로고침

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 