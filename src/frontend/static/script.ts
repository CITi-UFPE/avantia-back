interface ServerResponse {
  bb_o: string;
  prob: number;
  label: 'mask' | 'nomask';
};

type PosObjKey = 'top' | 'left' | 'width' | 'height';

const renderFilter = (
  pos: {
    top: number,
    left: number,
    width: number,
    height: number,
  },
  probability: number,
  label: 'mask' | 'nomask',
) => {
  const filterContainer = document.querySelector('.filter-container');

  filterContainer.innerHTML += `
    <div
      class="filter"
      style="
        ${Object.entries(pos).map(([key, value]) => `${key}:${value}px;`).join('')}
        border-color: ${label === 'mask' ? 'green' : 'red'};
      "
    >
      <div class="prob">${probability.toFixed(2)}</div>
    </div>
  `;
};

const deleteFilters = () => {
  const filters = document.querySelectorAll('.filter');

  filters.forEach((filter) => filter.outerHTML = '');
};

const createFilters = (filters: ServerResponse[]) => {
  deleteFilters();

  filters.forEach(({ bb_o, label, prob }) => {
    if (prob > 0.7) {
      const arrBbo = JSON.parse(bb_o);
      renderFilter(
        {
          left: arrBbo[0],
          top: arrBbo[1],
          width: arrBbo[2],
          height: arrBbo[3],
        },
        prob,
        label,
      );
    }
  });
};

(async () => {
  try {
    const video = document.querySelector('video');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500,
      },
    });

    video.srcObject = stream;

    const sendImage = async () => {
      const canvas = document.createElement('canvas');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext('2d').drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        const formData = new FormData();

        formData.set('image', blob);

        (async () => {
          try {
            // @ts-ignore
            const res = await axios.post('/image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            const info: ServerResponse[] = res.data.data;

            document.querySelector('.latency span').innerHTML = res.data.neuralNetLatency;

            createFilters(info);
          } catch (err) {
            console.log(err.response);
          }
        })();
      }, 'image/png');
    }

    const getMaskPosition = setInterval(sendImage, 1000);
  } catch (err) {
    console.log(err);
  }
})();
