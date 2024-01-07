function showSuccessMessage() {
  alert("You have successfully subscribed to our newsletter!");
}
function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var messageText = messageInput.value.trim();

  if (messageText !== "") {
    var chatMessages = document.getElementById("chat-messages");
    var newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.textContent = "You: " + messageText;
    chatMessages.appendChild(newMessage);

    messageInput.value = "";
  }
}
// Get the button
var mybutton = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
function scrollToImage(searchTerm) {
  var images = document.querySelectorAll("img[alt*='" + searchTerm + "']");

  if (images.length > 0) {
    images.forEach(function (img) {
      img.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else {
    console.log("Изображение с alt, содержащим '" + searchTerm + "', не найдено.");
  }
}

var searchForm = document.querySelector(".form-inline");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchTerm = document.getElementById("Search").value.trim().toLowerCase();
    scrollToImage(searchTerm);
  });
}
