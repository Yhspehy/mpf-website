import { uploadImg } from '~/src/service/api/img';

export default function useUpload() {
  const fileList = ref([]);

  function handleUpload({ file, data, onFinish, onError }) {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data);
      });
    }
    formData.append('file', file.file, file.name);
    fileList.value[fileList.value.length - 1].status = 'uploading';
    uploadImg(formData)
      .then((res) => {
        onFinish();
        fileList.value[fileList.value.length - 1].url = res;
      })
      .catch(() => {
        onError();
      });
  }

  function formatDefaultList(list) {
    fileList.value = list.map((e) => ({
      id: '',
      name: e,
      url: e,
      status: 'finished',
      percentage: 100
    }));
  }
  return {
    fileList,
    handleUpload,
    formatDefaultList
  };
}
