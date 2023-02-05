const inputWidth = document.querySelector(".field1");
const inputHeight = document.querySelector(".field2");
const submitButton = document.querySelector(".btn");
const titleSpan = document.querySelector(".title");
const imagesBlock = document.querySelector(".result");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    const width = inputWidth.value;
    const height = inputHeight.value;

    if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
        write("Одно из чисел вне диапазона от 100 до 300.");
        return;
    }

    write("Подождите...");

    fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => response.url)
        .then((result) => {
            loadPhoto(result);
            write("Фото загружено.");
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}

function write(text) {
    titleSpan.innerHTML = text;
}

function loadPhoto(photoUrl) {
    const cardBlock =   `<img
                          src="${photoUrl}"
                          style="margin-right: 50px"
                        />`;

    imagesBlock.innerHTML = cardBlock;
}