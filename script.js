document.getElementById('file-selector').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const newPath = file.webkitRelativePath.split('/').slice(0, -1).join('/');

      // 파일 내용을 수정하십쇼.
      const modifiedContent = modifyContent(fileContent, newPath);

      // 수정된 내용을 새 파일로 다운로드하거나 클립보드에 복사하십쇼.
      downloadFile(modifiedContent, 'modified.ini');
    };

    reader.onerror = (e) => {
      console.error('파일 읽기 중 오류 발생:', e);
    };
  }
});

document.getElementById('process-file').addEventListener('click', () => {
  document.getElementById('file-selector').click();
});

function modifyContent(content, newPath) {
  const modifiedContent = content.split('C:/Wabbajack').join(newPath);
  return modifiedContent;
}

function downloadFile(content, fileName) {
  const file = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
