$(document).ready(function () {

    class Warrior {
        constructor(isEnemy, name, healthPoint, profilePath) {
            this.isEnemy = false;
            this.name = name;
            this.healthPoint = healthPoint;
            this.attackPower = Math.floor(Math.random() * (50 - 1)) + 1;
            this.counterAttackPower = Math.floor(Math.random() * (50 - 1)) + 1;
            this.profilePath = profilePath;
        }

    }

    var warriors = [];
    (function () {
        warriors.push(new Warrior(false, "Obi-Wan Kenobi", 120, "../../assets/images/obi_wan_kenobi.jpeg"))
        warriors.push(new Warrior(false, "Luke Skywalker", 100, "../../assets/images/luke_skywalker.jpeg"));
        warriors.push(new Warrior(false, "Darth Sidious", 150, "../../assets/images/darth_sidious.jpg"));
        warriors.push(new Warrior(false, "Darth Maul", 180, "../../assets/images/darth_maul.jpg"))


        for (let i = 0; i < warriors.length; i++) {
            var div = $("<div>")
            $(div).addClass("character");
            $(div).attr("id", i + 1)

            var title = $("<h4>")
            $(title).addClass("character-title");
            $(title).html(warriors[i].name)

            var img = $("<img>")
            $(img).addClass("character-img")
            $(img).attr("src", warriors[i].profilePath);

            var footer = $("<h4>")
            $(footer).addClass("character-footer");
            $(footer).html(warriors[i].healthPoint);

            $(div).append(title);
            $(div).append(img);
            $(div).append(footer);

            $(".characters").append(div);
        }
    })()

    var warriorCharacter;
    var yourCharacterSelected = false;
    var enemySelected = false;
    var youSelected = null;
    $(".character").on("click", function () {
        warriorCharacter = $(".character")
        if (!yourCharacterSelected) {

            yourCharacterSelected = true;
            youSelected = $(this);
            for (let i = 0; i < warriorCharacter.length; i++) {
                if ($(warriorCharacter[i]).attr("id") != $(youSelected).attr("id")) {
                    $(warriorCharacter[i]).css("background", "red");

                    $(".enemies").append(warriorCharacter[i])
                }

            }
        }

        else if (!enemySelected) {
            enemySelected = true;
            for (let i = 0; i < warriorCharacter.length; i++) {
                if ($(this).attr("id") == $(warriorCharacter[i]).attr("id") &&
                    $(this).attr("id") != $(youSelected).attr("id")) {
                    $(this).css("background", "black");
                    $(".defender").append($(warriorCharacter[i]))
                }
            }
        }
    })
})