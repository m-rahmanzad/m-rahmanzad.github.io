$(function () {
  // initialize EmailJS
  emailjs.init({
    publicKey: "P5WnotqAyQ49tb95t",
  });

  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // جلوگیری از ارسال فرم پیش‌فرض

      // reCAPTCHA validation
      if (grecaptcha.getResponse() === "") {
        alert("Please verify that you are not a robot.");
        return;
      }
      // ارسال ایمیل با EmailJS
      emailjs
        .sendForm("service_6kjlllo", "template_z7ts26l", "#contactForm")
        .then(
          function () {
            // Success message
            $("#success").html("<div class='alert alert-success'>");
            $("#success > .alert-success")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
              )
              .append("<strong>Your message has been sent. </strong>");
            $("#success > .alert-success").append("</div>");
            // clear all fields
            $("#contactForm").trigger("reset");

            // Re-enable the send button after success
            $("#sendMessageButton").prop("disabled", false);
          },
          function (error) {
            // Fail message
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
              )
              .append(
                "<strong>Sorry, it seems that my mail server is not responding. Please try again later!</strong>"
              );
            $("#success > .alert-danger").append("</div>");

            // Re-enable the send button after failure
            $("#sendMessageButton").prop("disabled", false);
          }
        );
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle='tab']").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });

  // پاک کردن پیام خطا/موفقیت هنگام فوکوس روی name
  $("#name").focus(function () {
    $("#success").html("");
  });
});
