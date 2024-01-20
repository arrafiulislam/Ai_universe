const cardContainer = document.getElementById("card-container");
const seeMore = document.getElementById("see-more");
const spinner = document.getElementById("spinner");
const modalSection = document.getElementById('modal-section');

const cardFetch = async (isAll) => {
  spinner.style.display = "block";
  cardContainer.innerHTML = "";
  let res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  let data = await res.json();
  data = data.data.tools;

  if (!isAll && data.length > 6) {
    data = data.slice(0, 6);
    seeMore.style.display = "block";
  } else {
    seeMore.style.display = "none";
  }

  data.forEach((item, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList = "border border-gray-300 p-8 rounded-lg";
    cardElement.innerHTML = `
      <img class="w-full max-w-[450px] block mx-auto mb-6 rounded-lg"
      src="${
        index === 5 ? "./images/image_not_available.png" : item.image
      }" alt="Card Image">
      <h2 class="text-2xl font-bold text-black mb-2">Features</h2>
      <ol class="text-gray-500 space-y-1 list-[number] list-inside">
        <li>${item.features[0]}</li>
        <li>${item.features[1]}</li>
        ${item.features[2] ? `<li>${item.features[2]}` : ""}
      </ol>
      <hr class="my-6">
      <div class="flex justify-between items-center gap-8">
        <div>
          <h2 class="text-2xl font-bold text-black mb-2">${item.name}</h2>
          <span class="text-gray-500"><i class="fa-solid fa-calendar-days"></i> ${
            item.published_in
          }</span>
        </div>
        <i id="${
          item.id
        }" class="cardBtn fa-solid fa-arrow-right w-10 h-10 rounded-full bg-red-50 text-red-500 flex justify-center items-center text-xl cursor-pointer"></i>
      </div>
    `;
    cardContainer.appendChild(cardElement);
  });
  spinner.style.display = "none";
  const cardBtn = document.getElementsByClassName("cardBtn");
  for (let item of cardBtn) {
    item.addEventListener("click", function () {
      cardModal(this.getAttribute("id"))
    });
  }
};
cardFetch();

seeMore.addEventListener("click", () => {
  cardFetch(true);
});

const cardModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);
    modalSection.innerHTML = '';
    modalSection.innerHTML = `
      <dialog id="my_modal_1" class="modal">
        <form method="dialog" class="modal-box relative max-w-[1150px]">
          <div class="flex flex-col md:flex-row gap-6 justify-between mt-10">
            <div class="flex-1 bg-red-50 border border-red-500 p-6 rounded-lg">
              <p class="text-lg font-bold mb-6">${data.data.description}</p>
              <div class="flex flex-wrap justify-around items-stretch gap-4 mb-6">
                <div class="p-4 bg-white rounded text-green-500">
                  <span>${data.data?.pricing?.[0]?.price || 'Free'}<br>${data.data?.pricing?.[0]?.plan || 'Basic'}</span>
                </div>
                <div class="p-4 bg-white rounded text-orange-500">
                  <span>${data.data?.pricing?.[1]?.price || 'Free'}<br>${data.data?.pricing?.[1]?.plan || 'Pro'}</span>
                </div>
                <div class="p-4 bg-white rounded text-red-500">
                  <span>${data.data?.pricing?.[2]?.price?.split(' ')?.slice(0, 2)?.join(' ') || 'Free'}<br>${data.data?.pricing?.[2]?.plan || 'Enterprise'}</span>
                </div>
              </div>
              <div class="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 class="text-2xl font-bold mb-2">Features</h2>
                  <ul class="text-gray-500 space-y-1 list-[initial] list-inside">
                    <li>${data.data.features['1'].feature_name}</li>
                    <li>${data.data.features['2'].feature_name}</li>
                    <li>${data.data.features['3'].feature_name}</li>
                  </ul>
                </div>
                <div>
                  <h2 class="text-2xl font-bold mb-2">Integration</h2>
                  <ul class="text-gray-500 space-y-1 list-[initial] list-inside">
                    <li>${data.data.integrations?.[0] || 'No data found'}</li>
                    <li>${data.data.integrations?.[1] || 'No data found'}</li>
                    <li>${data.data.integrations?.[2] || 'No data found'}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex-1">
              <div class="p-4 border border-gray-100 rounded-lg">
                <img class="max-h-[260px] w-auto mx-auto rounded-lg block mb-4" src="${data.data.image_link[0]}" alt="Card Image">
                <h2 class="text-2xl font-bold mb-2 text-center">${data.data.input_output_examples?.[0]?.input || 'No input available'}</h2>
                <p class="text-gray-500 text-center">${data.data.input_output_examples?.[0]?.output || 'No output available to show'}</p>
              </div>
            </div>
          </div>
          <div class="modal-action absolute right-4 top-3 mt-0">
            <button><i class="fa-solid fa-circle-xmark text-3xl text-red-500"></i></button>
          </div>
        </form>
      </dialog>
    `;
    my_modal_1.showModal();
  })
}