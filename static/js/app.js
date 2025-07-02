// 페이지 로드 시 초기화 및 이벤트 리스너 설정
window.onload = function() {
    // 웹캠은 사용자가 직접 시작하도록 함
    console.log('웹캠 스트리밍 앱이 로드되었습니다.');
    
    // 이벤트 리스너 설정
    setupEventListeners();
};

// 웹캠 시작
async function startCamera() {
    try {
        const response = await fetch('/start_camera');
        const data = await response.json();
        
        if (data.status === 'success') {
            document.getElementById('video-feed').src = '/video_feed';
            document.getElementById('loading').style.display = 'flex';
            document.getElementById('video-feed').style.display = 'none';
            
            // 비디오 로드 완료 후 로딩 숨기기
            document.getElementById('video-feed').onload = function() {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('video-feed').style.display = 'block';
            };
            
            updateButtons(true);
            updateStatus('running', '웹캠 상태: 실행 중');
            hideError();
            startStatusCheck(); // 상태 확인 시작
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('웹캠 시작 중 오류가 발생했습니다.');
        console.error('Error:', error);
    }
}

// 웹캠 중지
async function stopCamera() {
    try {
        const response = await fetch('/stop_camera');
        const data = await response.json();
        
        if (data.status === 'success') {
            document.getElementById('video-feed').src = '';
            updateButtons(false);
            updateStatus('stopped', '웹캠 상태: 중지됨');
            hideError();
            stopStatusCheck(); // 상태 확인 중지
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('웹캠 중지 중 오류가 발생했습니다.');
        console.error('Error:', error);
    }
}

// 웹캠 상태 확인
async function checkCameraStatus() {
    try {
        const response = await fetch('/camera_status');
        const data = await response.json();
        
        if (data.status === 'running') {
            document.getElementById('video-feed').src = '/video_feed';
            updateButtons(true);
            updateStatus('running', '웹캠 상태: 실행 중');
        } else {
            updateButtons(false);
            updateStatus('stopped', '웹캠 상태: 중지됨');
        }
    } catch (error) {
        console.error('Status check error:', error);
        updateButtons(false);
        updateStatus('stopped', '웹캠 상태: 확인 불가');
    }
}

// 버튼 상태 업데이트
function updateButtons(isRunning) {
    document.getElementById('start-btn').disabled = isRunning;
    document.getElementById('stop-btn').disabled = !isRunning;
}

// 상태 표시 업데이트
function updateStatus(status, message) {
    const statusElement = document.getElementById('status');
    statusElement.className = `status ${status}`;
    statusElement.textContent = message;
}

// 오류 메시지 표시
function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// 오류 메시지 숨기기
function hideError() {
    document.getElementById('error-message').style.display = 'none';
}

// 웹캠이 실행 중일 때만 주기적으로 상태 확인
let statusCheckInterval = null;

function startStatusCheck() {
    if (!statusCheckInterval) {
        statusCheckInterval = setInterval(checkCameraStatus, 5000);
    }
}

function stopStatusCheck() {
    if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
        statusCheckInterval = null;
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 웹캠 시작 버튼
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startCamera);
    }
    
    // 웹캠 중지 버튼
    const stopBtn = document.getElementById('stop-btn');
    if (stopBtn) {
        stopBtn.addEventListener('click', stopCamera);
    }
    
    console.log('이벤트 리스너가 설정되었습니다.');
} 