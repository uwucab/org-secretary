var persons = {
  secretaria: ["Magaly Vásquez González"],
  "unid-esta-inst": ["Zany Sandoval", "zsandova-at-ucab.edu.ve", "407.4333"],
  "unid-iden-inst": ["Pegy Rodríguez", "ppedriqu-at-ucab.edu.ve", "407.6121"],
  "cent-cont-ucab": ["Nacary Flores", "nfloresl-at-ucab.edu.ve", "407.6129"],
  "unid-admi-doce": [
    "Ismaru Lara Duque",
    "ilaraduq-at-ucab.edu.ve",
    " 407.4295"
  ],
  "comi-disc": ["Lisbeth Da Costa", "ldacosta-at-ucab.edu.ve", "407.4295"],
  "dire-gest-estu": ["Karyn Ramos", "kramos-at-ucab.edu.ve", "407.4581"],
  "unid-aten-publ": ["Pegy Rodríguez", "ppedriqu-at-ucab.edu.ve", "407.6121"],
  "coor-ingr": ["Minka Hernández", "minherna-at-ucab.edu.ve", "407.4278"],
  "coor-egre": ["Eilyn Colmenares", "eicolmen-at-ucab.edu.ve", "407.4429"],
  "dire-admi-acad": [
    "María Gabriela Da Costa",
    "mdacosta-at-ucab.edu.ve",
    "407.4418"
  ],
  "unid-sopo-siste-admi-acad": [
    "Betzabeth Castillo",
    "bcastill-at-ucab.edu.ve",
    "407.4589"
  ],
  "coor-prog-gest-aula": [
    "Betzabeth Castillo",
    "bcastill-at-ucab.edu.ve",
    "407.4589"
  ],
  "coor-catal-capp": ["Mario Miranda", "mmiranda-at-ucab.edu.ve", "407.6120"],
  "dire-arch-gene": ["Starlys Manrique", "smanriqu-at-ucab.edu.ve", "407.6046"],
  "unid-sopo-sist-gest-docu": [
    "Beatriz Leyzeaga",
    "bleyzeag-at-ucab.edu.ve",
    "407.6088"
  ],
  "coor-gest-docu": ["Carla Hernández", "chernande-at-ucab.edu.ve", "407.4482"],
  "direc-secre-guay": [
    "Oliver Giusti",
    "ogiustic-at-ucab.edu.ve",
    "(0286) 600.0236"
  ]
};

jQuery(function() {
  var infoTT = jQuery(".org-chart-info");
  var isActive = false;
  var lastPositionClass;
  var lastKey;

  jQuery(".base").on("click", function(evt) {
    infoTT.fadeOut(150, function() {
      infoTT.attr("class", "org-chart-info");

      var target = jQuery(evt.currentTarget);
      var path = target.data("path") ? target.data("path").split(" ") : [];
      var ttPos = target.data("info-pos")
        ? target.data("info-pos")
        : "top left";

      jQuery(".base").removeClass("active");
      target.addClass("active");

      for (var i = 0; i < path.length; i++) {
        jQuery("#org-chart-" + path[i]).addClass("active");
      }

      var pos = getPosition(target);
      var info = "";
      var key = target.attr("id").replace("org-chart-", "");

      if (
        key &&
        persons &&
        persons[key] &&
        persons[key].length &&
        persons[key].length > 0
      ) {
        info =
          '<div><span class="org-chart-person-name">' +
          persons[key][0] +
          "</span>";

        if (persons[key][1]) {
          var email = persons[key][1].replace("-at-", "@");
          info +=
            '<span class="org-chart-person-email"><a href="mailto:' +
            email +
            '" target="_blank">' +
            email +
            "</a></span>";
        }

        if (persons[key][2]) {
          info +=
            '<span class="org-chart-person-phone">' +
            persons[key][2] +
            "</span>";
        }

        info += "</div>";
      }

      if (info && info !== "") {
        if (lastKey !== key) {
          if (lastKey) {
            hideInfo(lastPositionClass);
          }
          lastKey = key;
          showInfo(pos, info, target.data("info-position"));
        } else {
          hideInfo(lastPositionClass);
          lastKey = undefined;
        }
      }
    });
  });

  var showInfo = function(pos, info, cssClass) {
    jQuery(".org-chart-info")
      .addClass(cssClass)
      .css(pos)
      .html(info)
      .animate(
        {
          opacity: "toggle"
        },
        {
          duration: 200,
          start: function() {
            jQuery(this).css("display", "table");
          }
        }
      );
  };

  var hideInfo = function(cssClass) {
    jQuery(".org-chart-info")
      .removeClass(cssClass)
      .html("")
      .fadeOut();
  };

  var getPosition = function(elem) {
    if (elem) {
      var elemPos = elem.position();
      var pos = elem.data("info-position");
      var newPos = { left: 0, top: 0 };
      var offsetX = 20;
      var offsetY = 20;

      if (pos && pos !== null && pos !== "") {
        pos = pos.split("-");

        for (var i = 0; i < pos.length; i++) {
          switch (pos[i]) {
            case "top":
              newPos["top"] = elemPos.top - 78 - offsetY;
              break;
            case "center":
              newPos["top"] = elemPos.top + elem.outerHeight() / 2 - 39; // 78h info
              newPos["left"] = elemPos.left + offsetX;
              break;
            case "bottom":
              newPos["top"] = elemPos.top + elem.outerHeight() + offsetY;
              break;
            case "left":
              newPos["left"] = elemPos.left - 168 - offsetX;
              newPos["background-position"] = "-757px 0";
              break;
            case "right":
              newPos["left"] = elemPos.left + elem.outerWidth() + offsetX;
              newPos["background-position"] = "-758px -78px";
              break;
          }
        }
      }

      return newPos;
    }
  };

  jQuery("#background-color-select").on("click", "a", function(evt) {
    evt.preventDefault();

    jQuery("body").attr("class", jQuery(evt.target).attr("rel"));
  });
});
