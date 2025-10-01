const BOT_TOKEN = "8406701477:AAGsG2eAMcfNaV-rYXmUPEJqc4tWhBe1-c0";
const CHAT_ID = "-4882491523";

const form = document.querySelector(".team-invite__form");
const input = document.querySelector(".team-invite__input");

// Функция для красивого уведомления
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = `📩 Новый отклик:\nНик: ${input.value}`;

    // Сразу показываем уведомление (не ждём fetch)
    showToast("✅ Спасибо! Ваша заявка отправлена.");

    // Отправляем в фоне
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
        }),
    }).catch((err) => console.error("Ошибка отправки в Telegram:", err));

    input.value = "";
});
