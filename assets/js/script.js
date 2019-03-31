$(document).ready(function () {

    (function () {
        audio = new Audio("../musics/start.mp3");
        audio.play();
    })();


    //Helper functions
    function won() {
        if ($(".enemies .character").length > 0) {
            yourResultText.html("You defeated " + enemy.name + ", you can choose to fight another enemy.")
        } else {
            yourResultText.html("You defeated " + enemy.name + ".")
            $(".re-start").show();
        }
        enemySelected = false;
        enemiesResultText.html("")
        audioChecker("won")
    }

    function lost() {
        enemiesResultText.html("")
        yourResultText.html("You have been defeated... GAME OVER!");
        audioChecker("lost")
        $(".re-start").show();
        yourWarrior = null;
    }

    function audioChecker(type) {
        if (!audio.paused) {
            audio.pause();
        }
        if (type === "won") {
            audio = new Audio("../musics/youWon.mp3")
        } else if (type === "lost") {
            audio = new Audio("../musics/youLost.mp3")
        } else if (type === "hit") {
            audio = new Audio("../musics/hit.mp3")
        }
        audio.play();
    }



    //events
    $(document).on("click",".close", function () {
        $(".start").hide()
        $("body").css({
            "background": "url(../images/bg_image.jpg)",
            "background-size": "cover"
        })
        $("#container").show(500).fadeIn(1000);
        if (!audio.paused) {
            audio.pause()
        }
    })



    var staticId = 1;
    function setId() {
        return staticId++;
    }

    class Warrior {
        constructor(name, healthPoint, profilePath) {
            this.id = setId();
            this.name = name;
            this.healthPoint = healthPoint;
            this.attackPower = Math.floor(Math.random() * (30 - 1)) + 1;
            this.counterAttackPower = null;
            this.profilePath = profilePath;
        }
        setCounterAttackPower() {
            this.counterAttackPower = this.attackPower;
        }

        incrementAttackPower() {
            this.attackPower += this.counterAttackPower;
        }
    }


    class WarriorService {

        loadWarriors() {
            let warriors = [];
            warriors.push(new Warrior("Obi-Wan Kenobi", 120, "../images/obi_wan_kenobi.jpeg"))
            warriors.push(new Warrior("Luke Skywalker", 100, "../images/luke_skywalker.jpeg"));
            warriors.push(new Warrior("Darth Sidious", 150, "../images/darth_sidious.jpg"));
            warriors.push(new Warrior("Darth Maul", 180, "../images/darth_maul.jpg"))


            for (let i = 0; i < warriors.length; i++) {
                var div = $("<div>")
                $(div).addClass("character");
                $(div).attr("id", warriors[i].id)

                var title = $("<h4>")
                $(title).addClass("character-title");
                $(title).html(warriors[i].name)
                $(title).attr("id", warriors[i].id)

                var img = $("<img>")
                $(img).addClass("character-img")
                $(img).attr("src", warriors[i].profilePath);
                $(img).attr("id", warriors[i].id)


                var footer = $("<h4>")
                $(footer).addClass("character-footer");
                $(footer).html(warriors[i].healthPoint);
                $(footer).attr("id", warriors[i].id)


                $(div).append(title);
                $(div).append(img);
                $(div).append(footer);

                $(".characters").append(div);
            }
            return warriors;
        }

        removeAll() {
            var w = $(".character")
            for (let i = 0; i < w.length; i++) {
                $(".character#" + $(w).attr("id")).remove();
            }
        }

        getWarriorByName(warriorName) {
            for (let j = 0; j < warriors.length; j++) {
                if (warriors[j].name === warriorName) {
                    warriors[j].counterAttackPower = Math.floor(Math.random() * (50 - 1)) + 1;
                    return warriors[j];
                }
            }
        }

        removeWarriorById(id) {
            let w = $(".character")

            for (let i = 0; i < w.length; i++) {
                if ($(w[i]).prop("id") === id.toString()) {
                    $("#" + id).remove();
                    break;
                }
            }
        }

        play(yourResultText, enemiesResultText, you, enemy) {

            yourResultText.html("You attacked " + enemy.name + " for " + you.attackPower + " damage");
            enemiesResultText.html(enemy.name + " attacked you back " + enemy.attackPower + " damage");

            enemy.healthPoint -= you.attackPower;
            you.healthPoint -= enemy.attackPower;

            $("#" + enemy.id + ".character-footer").html(enemy.healthPoint);
            $("#" + you.id + ".character-footer").html(you.healthPoint);
        }

        selectEnemyCharacter(thisEnemy, yourWarrior) {

            let w = $(".character")
            for (let i = 0; i < w.length; i++) {

                if (thisEnemy.attr("id") == $(w[i]).attr("id") &&
                    thisEnemy.attr("id") != $(yourWarrior).attr("id")) {
                    thisEnemy.css({
                        "background": "black",
                        "color": "#fff"
                    });
                    $(".defender").append($(w[i]))
                }
            }
            return this.getWarriorByName($("." + thisEnemy.attr("class") + "#" + thisEnemy.prop("id") + "  .character-title").html())
        }

        selectYourCharacter(thisYou) {
            let w = $(".character")
            for (let i = 0; i < w.length; i++) {
                if ($(w[i]).attr("id") != thisYou.attr("id")) {
                    $(w[i]).css("background", "red");
                    $(".enemies").append(w[i])
                }

            }
            return this.getWarriorByName($("." + thisYou.attr("class") + "#" + thisYou.prop("id") + "  .character-title").html())
        }

    }

    var warriorService = new WarriorService();
    var warriors = warriorService.loadWarriors();



    var warriorCharacter;
    var yourCharacterSelected = false;
    var enemySelected = false;
    var yourWarrior;
    var enemiesWarrior;
    var you;
    var enemy;
    var yourResultText = $(".your-result-text");
    var enemiesResultText = $(".enemy-result-text")

    $(document).on("click", ".character", function () {
        warriorCharacters = $(".character")


        yourResultText.html("")
        enemiesResultText.html("")

        if (!yourCharacterSelected) {


            yourCharacterSelected = true;
            yourWarrior = $(this);

            you = warriorService.selectYourCharacter($(this))
            you.setCounterAttackPower()

        }

        else if (!enemySelected && $(this).prop("id") != $(yourWarrior).prop("id") && yourCharacterSelected) {
            enemiesResultText.html("")
            yourResultText.html("")
            enemySelected = true;
            enemy = warriorService.selectEnemyCharacter($(this), enemy, yourWarrior)
        }
    })



    $(document).on("click", ".attack", function () {
        if (enemySelected && yourWarrior != null) {
            audioChecker("hit");

            warriorService.play(yourResultText, enemiesResultText, you, enemy);
            if (enemy.healthPoint - you.attackPower > 0 && you.healthPoint - enemy.attackPower > 0) {
                you.incrementAttackPower();

            } else {
                if (enemy.healthPoint - you.attackPower <= 0 && you.healthPoint - enemy.attackPower > 0) {
                    warriorService.removeWarriorById(enemy.id);
                    enemySelected = false;
                    won();

                } else if (enemy.healthPoint - you.attackPower > 0 && you.healthPoint - enemy.attackPower <= 0) {
                    lost();
                } else {
                    if (enemy.healthPoint > you.healthPoint) {
                        lost();
                    } else {
                        won();
                    }
                }
            }
        }
    })


    $(document).on("click", ".re-start", function () {

        staticId = 1;
        $(".characters").empty();
        $(".defender").empty()
        $(".enemies").empty()
        yourCharacterSelected = false;
        enemySelected=false;
        enemiesResultText.html("");
        yourResultText.html("");
        warriors = warriorService.loadWarriors();
        $(this).hide();

    })
})