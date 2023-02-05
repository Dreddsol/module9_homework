const inputPageNumber = document.querySelector(".field1");
const inputLimit = document.querySelector(".field2");
const submitButton = document.querySelector(".btn");
const titleSpan = document.querySelector(".title");
const imagesContainer = document.querySelector(".result");

submitButton.addEventListener("click", submitButtonHandle);

if (loadImagesFromLocalStorage())
    write("Загружены последние просмотренные фото.");

function submitButtonHandle() {
    const pageNumber = inputPageNumber.value;
    const limit = inputLimit.value;

    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        write("Номер страницы и лимит вне диапазона от 1 до 10.");
        return;
    } else
    if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
        write("Номер страницы вне диапазона от 1 до 10.");
        return;
    } else
    if (limit < 1 || limit > 10 || isNaN(limit)) {
        write("Лимит вне диапазона от 1 до 10.");
        return;
    }

    write("Загружаю фото...");

    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            loadImages(json);
            saveImagesToLocalStorage();
            write("Фото загружены.");
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}

function write(text) {
    titleSpan.innerHTML = text;
}

function loadImages(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.download_url}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.author}</p>
                              </div>`;
        cards += cardBlock;
    });

    imagesContainer.innerHTML = cards;
}

function saveImagesToLocalStorage() {
    localStorage.setItem("last_images", imagesContainer.innerHTML);
}

function loadImagesFromLocalStorage() {
    imagesContainer.innerHTML = localStorage.getItem("last_images");
    return  imagesContainer.innerHTML.length > 0;
}