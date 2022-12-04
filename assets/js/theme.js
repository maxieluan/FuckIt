(function() {
    "use strict"; // Start of use strict
  
    // Show the navbar when the page is scrolled up
    var MQL = 992;
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var mainNav = document.querySelector('#mainNav');
  
    //primary navigation slide-in effect
    if (mainNav && vw > MQL) {
      var headerHeight = mainNav.offsetHeight;
      var previousTop = window.pageYOffset;
      
      window.addEventListener('scroll', function() {
        var currentTop = window.pageYOffset;
        //check if user is scrolling up
        if (currentTop < previousTop) {
          //if scrolling up...
          if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
            mainNav.classList.add('is-visible');
          } else {
            mainNav.classList.remove('is-visible', 'is-fixed');
          }
        } else if (currentTop > previousTop) {
          //if scrolling down...
          mainNav.classList.remove('is-visible');
  
          if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
            mainNav.classList.add('is-fixed');
          }
        }
        previousTop = currentTop;
      });
    }

    // load svg icons
    $("[data-svg-src]").each(function(){
      console.log($(this).attr("data-svg-src"))
      var icon = $(this)
      $.get($(this).attr("data-svg-src"), function(data){
        icon.replaceWith($(data).find("svg"))
      })
    })
    
    // load typeit
    $("[typeit-data]").each(function(){
      var typeit = $(this)
      var typeitData = typeit.attr("typeit-data")
      var id = typeit.attr("id")
      new TypeIt("#"+id, {strings: [typeitData]}).go()
    })

    // sticky sidebar
    $(document).ready(function(){
      $("#toc").theiaStickySidebar({
        "containerSelector": ".container.row",
        'sidebarBehavior':'modern',
        'additionalMarginTop': 80,
      })

      $("#featured-articles").theiaStickySidebar({
        "containerSelector": ".container.row",
        'sidebarBehavior':'modern',
        'additionalMarginTop': 80,
      })

      $(".content table").wrap("<div class='table-wrapper'></div>")

      for(var num = 1; num <= 6; num++){
        $(".single .content > h" + num).each(function(){
          $(this).addClass("headerLink")
          $(this).prepend("<a href=\"#".concat($(this).attr("id"), "\" class=\"header-mark\"></a>"))
        })
      }

      $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
          $('#toTopBtn').fadeIn();
        } else {
          $('#toTopBtn').fadeOut();
        }
      });
    
      $('#toTopBtn').click(function() {
        $("html, body").animate({
          scrollTop: 0
        }, 0);
        return false;
      });
    })

    // hightlight
    $(".highlight > pre.chroma").each(function(){
      var chroma = $("<div/>").addClass($(this).className)
      var table = $("<table/>")
      chroma.append(table)
      var tbody = $("<tbody/>")
      table.append(tbody)
      var tr = $("<tr/>")
      tbody.append(tr)
      var td = $("<td/>")
      tr.append(td)
      $(this).empty().append(chroma)
      td.append($(this))
    })

    $(".highlight > .chroma").each(function() {
      $(this).addClass("open")
      var codeElements = $("pre.chroma > code")
      if (codeElements.length) {
        var code = codeElements[codeElements.length - 1]
        var header = $("<div/>").addClass('code-header ' + code.className.toLowerCase())
        var title = $("<span/>").addClass('code-title')
        title.prepend($('<i class="arrow fas fa-chevron-right fa-fw" aria-hidden="true"></i>'))
        title.on("click", function(){
          $(this).classList.toggle("open")
        }, false)
        header.append(title)
        var ellipses = $("<span/>").prepend($('<i class="fas fa-ellipsis-h fa-fw" aria-hidden="true"></i>')).addClass("ellipses").on("click", function(){
          $(this).classList.toggle("open")
        }, false)
        header.append(ellipses)
        var copy = $("<span/>").prepend($('<i class="far fa-copy fa-fw" aria-hidden="true"></i>')).addClass("copy")
        var codeinnertext = code.text()
        
        header.append(copy)
        $(this).insertBefore(header, this.firstChild)
      }
    })
  })(); // End of use strict