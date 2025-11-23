document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const token = await grecaptcha.execute(
    "6LeV8RUsAAAAAIPE-BUPFJwxaAq7r12rus5cD4x1",
    { action: "submit" }
  );

  const data = new FormData(form);
  data.append("recaptcha_token", token);

  const response = await fetch("send.php", {
    method: "POST",
    body: data,
  });

  const result = await response.text();
  alert(result);
});
