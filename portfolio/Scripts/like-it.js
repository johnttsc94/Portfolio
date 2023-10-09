jQuery(document).ready(function ($) {
    // Function to check if the user has already liked the post
    function checkIfLiked(post_id) {
      var likedPosts = getCookie("liked_posts");
      if (likedPosts) {
        likedPosts = JSON.parse(likedPosts);
        return likedPosts.includes(post_id);
      }
      return false;
    }
  
    // Function to set a cookie
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    // Function to get a cookie value
    function getCookie(name) {
      var nameEQ = name + "=";
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == " ")
          cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) == 0)
          return cookie.substring(nameEQ.length, cookie.length);
      }
      return null;
    }
  
    // Update like button text and count on page load
    $(".like-btn").each(function () {
      var post_id = $(this).data("postid");
      var isLiked = checkIfLiked(post_id);
      if (isLiked) {
        $(this).addClass("liked");
        $(this).removeClass("not-rated");
      }
    });
  
    $(".like-btn").on("click", function () {
      var post_id = $(this).data("postid");
      var security = edrea_ajax.nonce;
  
      $.ajax({
        url: edrea_ajax.ajax_url,
        type: "POST",
        data: {
          action: "edrea_like_post",
          security: security,
          post_id: post_id,
        },
        success: function (response) {
          if (response.success === true) {
            if (response.data.action === "liked") {
              // Post was liked, update the button text to "Unlike"
              $('.like-btn[data-postid="' + post_id + '"]').addClass("liked");
              $('.like-btn[data-postid="' + post_id + '"]').removeClass(
                "not-rated"
              );
  
              // Store the post ID as liked in the cookie
              var likedPosts = getCookie("liked_posts")
                ? JSON.parse(getCookie("liked_posts"))
                : [];
              if (!likedPosts.includes(post_id)) {
                likedPosts.push(post_id);
                setCookie("liked_posts", JSON.stringify(likedPosts), 30); // Expires in 30 days
              }
            } else if (response.data.action === "unliked") {
              // Post was unliked, update the button text to "Like"
              $('.like-btn[data-postid="' + post_id + '"]').addClass("not-rated");
              $('.like-btn[data-postid="' + post_id + '"]').removeClass("liked");
  
              // Remove the post ID from the liked_posts cookie
              var likedPosts = getCookie("liked_posts")
                ? JSON.parse(getCookie("liked_posts"))
                : [];
              if (likedPosts.includes(post_id)) {
                likedPosts = likedPosts.filter(function (id) {
                  return id !== post_id;
                });
                setCookie("liked_posts", JSON.stringify(likedPosts), 30); // Expires in 30 days
              }
            }
  
            // Update the like count on the webpage
            $('.count[data-postid="' + post_id + '"]').text(
              response.data.likes_count !== 0
                ? response.data.likes_count <= 9
                  ? `0${response.data.likes_count}`
                  : response.data.likes_count
                : 0
            );
          } else {
            if (response.data === "already_liked") {
              alert("You have already liked this post.");
            } else {
              alert("Error: " + response.data);
            }
          }
        },
        error: function (error) {
          console.error("Error: ", error);
        },
      });
    });
  });