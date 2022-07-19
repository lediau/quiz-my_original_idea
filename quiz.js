$(function() {
/********************OOP**********************/   
    var pIndex = 0;
    var index = 0;
    var shuff = ["","","",""];
    var ev;
    function rand(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    //*****Creating Blueprint for questions******
    function questions(prize, category, question, alt, hint, publicVote, fifty1, fifty2) {
        this.prize = prize;
        this.category = category;
        this.question = question;
        this.alt = alt;
        this.hint = hint;
        this.publicVote = publicVote;
        this.fifty1 = fifty1;
        this.fifty2 = fifty2;
        
    //Method to print question and elements
        this.addData = function addData() {
            $("#prize").text(this.prize);
            $("#category").text (this.category);
            $("#question").text (this.question);
			$("#prpr").text (this.prize);
        }
        
        //Marking the 4th answer as correct
        this.correct = function correct() {
            sakte = this.alt[3];
        }
         
        //Shuffling answers so they are not the same all the time
        this.shuffle = function shuffle() {
            for(var i = 0; i<4; i++) {
                shuff[i] = rand(this.alt);
                while(shuff[i] == shuff[i-1] || shuff[i] == shuff[i-2] || shuff[i] == shuff[i-3]) {
                    shuff[i] = rand(this.alt);
                } 
                
                ev = $("#a"+(i+1));
                //printing alternatives
                ev.html(shuff[i]);
                
                //if it is correct or not
                if(ev.text() == sakte){
                    ev.on("click", function(){
                        $(this).css("background", "linear-gradient(green, lime, green)");
                        $("#youwon").show();
                    });
                } else {
                    ev.on("click", function(){
                        $(this).css("background", "linear-gradient(red, pink, red)");
                        $("#youlost").show();
                    });
                }
            }
        }//end of shuffle method
                               
        //REMOVE
        this.removing = function removing() {
                $(".alt").off("click");
                $(".alt").css("background", "linear-gradient(#CCC, #DDD, #CCC)");
        }
        
        //Hint method
        this.useHint = function useHint() {
           $("#hintbox").html (this.hint);
        }
        //Public Vote method
        this.usePubVote = function usePubVote(){
            $("#publicbox").html (this.publicVote);
        }
        //Fifty method
        this.useFifty = function useFifty() {
            for(var x = 1; x<5; x++) {
                if(($("#a" + x).text() == this.fifty1) || ($("#a" + x).text() == this.fifty2)) {
                    $("#a" + x).hide(1000);
                }
            }
        }
    } //End function with object properties

/*******************Entrance******************/
//Styling the prompt ENTER USERNAME box
/*    swal({ 
        title: "Sign in!",
        text: "Write your username:",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,    
        inputPlaceholder: "Username" 
        },
        function (inputValue) { 
        if (inputValue.length >15) { 
        swal.showInputError("The username must contain less than 15 characters!");
        return false;
        }
        if (inputValue === "") {
        swal.showInputError("You must enter one!");
        return false;
        }
        swal("Nice!", "Welcome " + inputValue +"!", "success"); 
        $("#welcome").append(" " + inputValue);  
        });*/
        
//YOU LOST
    $("#gotomenu").click(function(){
        $("#playground, #youlost").hide(2000);
        $(".norule").show(2000);
    });
//showing rules
    $("#rules").click(function(){
        $(".norule").hide(2000);
        $("#rulebook").show(2000);
    });
//hiding rules
    $("#closerules").click(function(){
        $(".norule").show(2000);
        $("#rulebook").hide(2000);
    });
//showing question
    $("#new").click(function(){
        $(".norule").hide(2000);
        $("#playground").show(2000);
        $(".helprule").show();
        pIndex = 0;
    });
//hiding notifications
    $(".next").click(function(){
        $(".youdid").hide(2000);
		//STOP IF GAME HAS FINISHED
		if(pIndex == 10) {
			$("#playground, #youlost").hide(2000);
			$(".norule").show(2000);
			pIndex == 0;
		}
    });

//Animation for the stages
    var animoney = setInterval(anim, 1000);
    var stag = 0;
    function anim() {
        $("#stages .btn-block").css("background-color", "lightgrey");
        $("#stages .btn-block").eq(stag).css("background-color", "lime");
        stag++;
        if(stag>9) {
            stag=0;
        }
    }
//Tooltip bootstrap
    $("[data-toggle='tooltip']").tooltip();

    
//Function for reseting helps used
    function resetHelps() {
        $(".helpbox").text("");
        $(".alt").show();
    }
//Function for helps at each stage
    function useHelps(index) {
        //Applying hint method
        $("#hint").click(function(){
            index.useHint();
            $(this).hide(1000);
        });
    //Applying public method
        $("#public").click(function(){
            index.usePubVote();
            $(this).hide(1000);
        });
    //Applying fifty method
        $("#fifty").click(function(){
            index.useFifty();
            $(this).hide(1000);
        });
    }

/**************EXECUTE QUESTIONS***********/ 
    $("#new, #next").click(function(){
    //****Array of object questions****
        var que = [
            [new questions("50", "Geography", "Which country has a larger area?", ["USA", "Canada", "China", "Russia"], "This country is situated in Europe and Asia partly.", "65% Russia<br>18% USA<br>10% Canada<br>7% China", "China", "USA"),
			new questions("50", "Science", "How many meters are there in 2 kilometers?", ["200", "0.02", "0.002", "2 000"], "1 kilometer is bigger than 1 meter.", "59% 2000<br>24% 0.002<br>15% 200<br>2% 0.02", "0.02", "0.002"),
			new questions("50", "Art", "Who wrote the well-known tragedy 'Romeo and Juliet'?", ["Fyodor Dostoyevsky", "Stefan Zweig", "Dante Alighieri", "William Shakespeare"], "This tragedy was written in XVI century.", "72% Shakespeare<br>23% Alighieri<br>4% Dostoyevsky<br>1% Zweig", "Fyodor Dostoyevsky", "Stefan Zweig"),
			new questions("50", "Sport", "In which sport are these terms used: '3-point, rebound, assist, travelling...'?", ["Badminton", "Tennis", "Soccer", "Basketball"], "This sport is usually played with a brown-orange ball.", "64% Basketball<br>27% Badminton<br>6% Soccer<br>3% Tennis", "Badminton", "Tennis"),
			new questions("50", "History", "The Great Wall of China was built by:", ["Japan", "Mongolia", "North Korea", "China"], "It was built in order to protect the country from invasion.", "82% China<br>9% Mongolia<br>9% North Korea<br>0% Japan", "North Korea", "Japan"),
			new questions("50", "Entertainment", "The song 'We Are The World' was sung by which famous singer?", ["Tina Turner", "Lana Del Rey", "Bon Jovi", "Michael Jackson"], "The song was published in 2004.", "73% Michael Jackson<br>10% Tina Turner<br>10% Lana Del Rey<br>7% Bon Jovi", "Bon Jovi", "Tina Turner")
			],
            [new questions("100", "Geography", "Which of the followings is the capital city of Libya?", ["Libya", "Alexandria", "Alger", "Tripoli"], "The capital has not the same name as the country...", "42% Tripoli<br>28% Alexandria<br>13% Alger<br>17% Libya", "Alger", "Libya"),
            new questions("100", "Science", "Which chemical symbol stands for Gold?", ["Go", "Ag", "G", "Au"], "The symbol is not related to the english name...", "20% Go<br>39% Au<br>12% G<br>29% Ag", "G", "Ag"),
            new questions("100", "Art", "Which famous artist painted 'Mona Lisa'?", ["Salvador Dali", "Pablo Piccaso", "Vincent van Gogh", "Leonardo da Vinci"], "The picture belongs to the Middle Age...", "12% Salvador Dali<br>13% Pablo Piccaso<br>4% Vincent van Gogh<br>71% Leonardo da Vinci", "Salvador Dali", "Pablo Piccaso"),
            new questions("100", "Sport", "Manchester United is a soccer team that plays in which country?", ["Italy", "France", "Spain", "England"], "The name is in the language of the country where it plays...", "22% Italy<br>15% France<br>40% England<br>23% Spain", "Spain", "France"),
            new questions("100", "History", "Where was Marco Polo, a well-known discoverer, from?", ["Spain", "Argentina", "England", "Italy"], "His name can tell you more about his nationality...", "40% Italy<br>12% Argentina<br>9% England<br>39% Spain", "Argentina", "England"),
            new questions("100", "Entertainment", "In the movie 'Tommy and Jerry', Spike is a?", ["Human", "Mouse", "Cat", "Dog"], "Spike is an animal...", "15% Human<br>50% Dog<br>15% Cat<br>20% Mouse", "Cat", "Mouse")
			],
            [new questions("200", "Science", "If someone calculates the derivate of a function, it means he measures the ... this function changes.", ["Trajectory", "Time", "Acceleration", "Speed"], "The second derivate tells the acceleration of that function.", "45% Speed<br>21% Acceleration<br>20% Trajectory<br>14% Time", "Time", "Trajectory"),
			new questions("200", "Geography", "Which color is NOT present in Belgium's flag?", ["Black", "Red", "Yellow", "Blue"], "It has the same colors as Germany's flag.", "54% Blue<br>31% Black<br>9% Red<br>6% Yellow", "Red", "Yellow"),
			new questions("200", "Art", "If you say 'hola', you are saying hello in what language?", ["Portuguese", "Italian", "French", "Spanish"], "This language is widely spoken in Latin America.", "44% Spanish<br>43% Portuguese<br>13% Italian<br>0% French", "French", "Portuguese"),
			new questions("200", "Sport", "Which car brand has as an emblem a three pointed star?", ["BMW", "Ferrari", "Renault", "Mercedes-Benz"], "It is a German Company.", "58% Mercedes-Benz<br>24% BMW<br>16% Renault<br>2% Ferrari", "Ferrari", "BMW"),
			new questions("200", "History", "The Great Depression was mainly related to:", ["Sport", "Military", "Politics", "Economy"], "It began after the stock market crash in 1929.", "40% Economy<br>38% Politics<br>21% Military<br>1% Sport", "Sport", "Politics"),
			new questions("200", "Entertainment", "Which one of these games is not played using dices?", ["Ludo", "Yahtzee", "Backgammon", "They all use dices"], "All the games are board games.", "36% They all use dices<br>35% Yahtzee<br>27% Ludo<br>2% Backgammon", "Backgammon", "Ludo")
			],
            [new questions("500", "Geography", "Which option is correct about the clock in Moscow, Russia?", ["GMT+0", "GMT+1", "GMT+2", "GMT+3"], "GMT stands for Greenwich Mean Time Zone.", "32% GMT+3<br>31% GMT+2<br>28% GMT+1<br>9% GMT+0", "GMT+0", "GMT+1"),
            new questions("500", "Science", "Which unit is used for charge?", ["W (Watt)", "V (Volt)", "A (Amper)", "C (Culon)"], "There is also a Force with that name.", "45% Culon<br>45% Amper<br>6% Volt<br>4% Watt", "V (Volt)", "W (Watt)"),
			new questions("500", "Art", "A pentagram contains:", ["5 lines and 5 spaces", "4 lines and 4 spaces", "4 lines and 5 spaces", "5 lines and 4 spaces"], "Penta(from Greek) means five.", "38% 5 lines and 4 spaces<br>30% 5 lines and 5 spaces<br>17% 4 lines and 4 spaces<br>15% 4 lines and 5 spaces", "4 lines and 5 spaces", "4 lines and 4 spaces"),
			new questions("500", "Sport", "In which sport did Steffi Graf featured?", ["Long Jump", "Aerobic Gymnastic", "Volleyball", "Tennis"], "She used to play single or double matches.", "36% Aerobic Gymnastic<br>32% Tennis<br>31% Long Jump<br>1% Volleyball", "Volleyball", "Long Jump"),
			new questions("500", "History", "Which country was NOT part of Yugoslavia?", ["Serbia", "Croatia", "Montenegro", "Albania"], "Yugoslavia used to have good politic relationships with Russia(USSR).", "42% Albania<br>37% Croatia<br>21% Montenegro<br>0% Serbia", "Serbia", "Montenegro"),
			new questions("500", "Entertainment", "Rovio Entertainment (a video game developer) is famous for which game?", ["Dream Soccer League", "Talking Tom", "None of them", "Angry Birds"], "They are a Finish company that mostly produce games based on movies.", "40% None of them<br>40% Angry Birds<br>15% My Talking Tom<br>5% Dream Soccer League", "Talking Tom", "Dream Soccer League")
			],
            [new questions("1 000", "Geography", "If somebody has visited 'Cau Vang' or 'Golden Bridge', known as 'Hands of God', it means he has been in:", ["Malaysia", "South Korea", "China", "Vietnam"], "The bridge's name is in the native language.", "29% China<br>27% Malaysia<br>27% Vietnam<br>17% South Korea", "China", "South Korea"),
            new questions("1 000", "Science", "Which material has the greatest density?", ["Platinium", "Sand", "Lead", "Osmium"], "It is also a transitional metallic element.", "36% Platinium<br>32% Osmium<br>31% Lead<br>1% Sand", "Sand", "Platinium"),
			new questions("1 000", "Art", "Which one is NOT an Architectural style?", ["Baroque", "Rococo", "They all are", "Versaille"], "Architectural style names are usually in French.", "33% They all are<br>33% Versaille<br>19% Rococo<br>15% Baroque", "Baroque", "They all are"),
			new questions("1 000", "Sport", "Where were the first Olympic Games held?", ["Rome", "Berlin", "London", "Athens"], "The origin of these games dates from Antiquity.", "44% Athens<br>42% Rome<br>9% London<br>5% Berlin", "Berlin", "Rome"),
			new questions("1 000", "History", "Which country was NOT part of Allies in the WW1?", ["USA", "Great Britain", "Russia", "Germany"], "Allies won the WW1.", "35% Germany <br>33% Russia<br>24% USA<br>8% Great Britain", "Great Britain", "USA"),
			new questions("1 000", "Entertainment", "'A Million Dreams' is the soundtrack of which movie?", ["Me Before You", "The Great Gatsby", "La La Land", "The Greatest Showman"], "Hugh Jackman features in that film.", "34% Me Before You <br>34% The Greatest Showman<br>30% The Great Gatsby<br>2% La La Land", "Great Britain", "USA")
			],
            [new questions("2 000", "Geography", "If you have visited the city of Timbuktu, it means you have been in:", ["Nicaragua", "Peru", "India", "Mali"], "Timbuktu became a rich city due to the salt found in the desert.", "29% India<br>28% Mali<br>27% Nicaragua<br>16% Peru", "India", "Peru"),
            new questions("2 000", "Science", "If you have suffered from SternoCleidoMastoideum pain, it means you have had problems with your:", ["Harmstring", "Ear", "Knee", "Neck"], "SternoCleidoMastoideum is a muscle.", "33% Neck<br>31% Knee<br>31% Harmstring<br>5% Ear", "Ear", "Knee"),
			new questions("2 000", "Art", "What art are we talking about if we mention the terms 'stacato, addagio, allegro...'?", ["Dancing", "Sculpture", "Picture", "Music"], "Those terms are in Italian.", "40% Music<br>33% Dancing<br>16% Sculpture<br>11% Picture", "Picture", "Sculpture"),
			new questions("2 000", "Sport", "Which country won the first Soccer World Cup ever held?", ["Brasil", "Argentina", "England", "Uruguay"], "It was held in 1954 in Uruguay.", "31% Brasil <br>28% Argentina<br>27% Uruguay<br>14% England", "England", "Argentina"),
			new questions("2 000", "History", "In which battle did Napoleon returned home with a defeat?", ["Kazan", "Saint Helen", "Elba", "Waterloo"], "This battle took place in Europe.", "40% Elba <br>28% Waterloo<br>28% Saint Helen<br>4% Kazan", "Elba", "Saint Helen"),
			new questions("2 000", "Entertainment", "If Tim must take his medicaments every hour(1 per hour), at least how many hours will he need to take 5 of them?", ["5", "6", "0", "4"], "You have to focus on the minimal time needed.", "50% 5 <br>25% 0<br>13% 4<br>12% 6", "0", "6")
			],
            [new questions("5 000", "Geography", "Which country has the least number of inhabitants until August 2018?", ["Malta", "Groenland", "Monaco", "Pitcairn Islands"], "That country is an island.", "37% Groenland<br>31% Pitcairn Islands<br>27% Malta<br>5% Monaco", "Monaco", "Groenland"),
            new questions("5 000", "Science", "If a programmer writes the piece of code: System.out.println('Did you know?'); , it means he is using which language?", ["Python", "C++", "JavaScript", "Java"], "This language is based on OOP.", "32% Java<br>31% C++<br>25% JavaScript<br>12% Python", "Python", "C++"),
			new questions("5 000", "Art", "Who took the Nobel Prize in Literature in 2016?", ["J.K. Rowling", "Michael Jackson", "Kazuo Ishiguro", "Bob Dylan"], "This person was not only a writer.", "32% Kazuo Ishiguro<br>32% J.K. Rowling<br>20% Bob Dylan<br>16% Michael Jackson", "J.K. Rowling", "Kazuo Ishiguro"),
			new questions("5 000", "Sport", "What is the country for which the famous soccer player Luka Modric plays?", ["France", "The Netherlands", "Serbia", "Croatia"], "His last name can tell you more.", "45% Croatia<br>34% Serbia<br>15% The Netherlands<br>6% France", "France", "Serbia"),
			new questions("5 000", "History", "Whay year did the attack in Pearl Harbour occur?", ["1939", "1945", "1943", "1941"], "That was a surprising attack that forced USA to enter the war.", "35% 1941 <br>29% 1943<br>24% 1945<br>12% 1939", "1939", "1943"),
			new questions("5 000", "Entertainment", "Which animanted movie is NOT produced by Dreamwork?", ["How to train your Dragon", "Rise of the Guardians", "Shrek Forever", "Ratatouille"], "One of them is produced by Disney.", "30% Rise of the Guardians <br>29% Ratatouille<br>29% How to train your dragon<br>12% Shrek Forever", "Shrek Forever", "How to train your Dragon")
			],
            [new questions("10 000", "Geography", "The island of Niue is found in:", ["Central America", "Africa", "Asia", "Oceania"], "The official language in Niue is English.", "31% Central America <br>31% Oceania<br>21% Asia<br>17% Africa", "Africa", "Central America"),
			new questions("10 000", "Science", "What should someone do in order to increase the current in a wire?", ["Increase the temperature", "It can NOT be changed", "Decrease the voltage", "Decrease the temperature"], "If the temperature increases, the resistence increases.", "40% Decrease the voltage<br>28% Decrease the temperature<br>27% Increase the temperature<br>5% It can NOT be changed", "Decrease the voltage", "It can NOT be changed"),
			new questions("10 000", "Art", "Which one is not a technique used in picture?", ["Tempera", "Acquarello", "Pointilism", "Paintello"], "These techniques are usually in French or Italian.", "43% Paintello<br>24% Pointilism<br>17% Acquarello<br>16% Tempera", "Tempera", "Acquarello"),
			new questions("10 000", "Sport", "Supposing that every palyer has two hands, how many hands are on the ice in a hockey match in NHL?", ["30", "26", "24", "32"], "Do NOT forget the referees.", "52% 24<br>24% 30<br>24% 32<br>0% 26", "26", "24"),
			new questions("10 000", "History", "Which country does NOT have a written Constitution?", ["New Zealand", "Israel", "United Kingdom", "All of them"], "Having a Constitution is not obligatory.", "37% United Kingdom<br>21% Israel<br>21% New Zealand<br>21% All of them", "Israel", "New Zealand"),
			new questions("10 000", "Entertainment", "Which app won the prize Google Play I/O Award for Best App of 2017?", ["Sololearn", "Temple Run", "Subway Surfer", "Memrise"], "It is a learning application.", "34% Subway Surfer <br>33% Temple Run<br>27% Memrise<br>6% Sololearn", "Subway Surfer", "Temple Run")			
			],
            [new questions("50 000", "Geography", "What is the height of Kilimanjaro mountain?", ["6 975 m", "4 595 m", "7 485 m", "5 895 m"], "It is the highest mountain in Africa, shorter than Aconcagua, higher than Mount Blanc.", "40% 5 895 m<br>40% 6 975 m<br>17% 4 595 m<br>3% 7 485 m", "4 595 m", "7 485 m"),
			new questions("50 000", "Science", "How many molecules of Oxygen are released during the photosynthesis of 1 mol glucose?", ["1", "0", "3", "6"], "The reactants of the process are CO2 and H2O.", "42% 6 <br>28% 1<br>25% 3<br>5% 0", "0", "3"),
			new questions("50 000", "Art", "Which artist said: 'Genius is eternal patience.'?", ["Salvador Dali", "Pablo Piccaso", "Leonardo Da Vinci", "Michelangelo"], "He is an Italian artist.", "45% Leonardo Da Vinci<br>24% Pablo Piccaso<br>22% Michelangelo<br>9% Salvador Dali", "Pablo Piccaso", "Leonardo Da Vinci"),
			new questions("50 000", "Sport", "What was the result of the final match of Soccer World Cup 1998?", ["Italy-Germany 4-2", "Germany-France 0-1", "Argentina-Italy 1-3", "Brasil-France 0-3"], "It was held in France.", "41% Brasil-France 0-3<br>23% Italy-Germany 4-2<br>19% Germany-France 0-1<br>17% Argentina-Italy 1-3", "Italy-Germany 4-2", "Argentina-Italy 1-3"),
			new questions("50 000", "History", "What year was the first picture taken?", ["1805", "1860", "1845", "1826"], "One century later the world would be rearranging from one World War.", "48% 1845<br>45% 1826<br>5% 1860<br>2% 1805", "1860", "1805"),
			new questions("50 000", "Entertainment", "Which singer is part of the cast of Hotel Transylvania?", ["Taylor Swift", "Demi Lovato", "Rihanna", "Selena Gomez"], "She is behind the voice of Mavis.", "26% Selena Gomez <br>25% Rihanna<br>25% Taylor Swift<br>24% Demi Lovato", "Taylor Swift", "Rihanna")
			],
            [new questions("100 000", "Geography", "Except a celebration, Christmass is:", ["a sea", "a country", "a mountain", "an island"], "It is situated in South-East Asia.", "41% a mountain <br>39% an island<br>12% a sea<br>8% a country", "a country", "a sea"),
			new questions("100 000", "Science", "If you suffer from Astraphobia, it means you are affraid of:", ["Spiders", "Stars", "Snakes", "Thunders"], "The name of phobia is usually in Latin language.", "36% Snakes <br>36% Spiders<br>28% Thunders<br>0% Stars", "Spiders", "Snakes"),
			new questions("100 000", "Art", "Where is the famous picture of Edvart Munch 'The Scream' kept?", ["Rome, Italy", "Berlin, Germany", "Paris, France", "Oslo, Norway"], "The painting is held in the country where Munch was born.", "49% Paris, France<br>47% Berlin, Germany<br>2% Oslo, Norway<br>2% Rome, Italy", "Paris, France", "Rome, Italy"),
			new questions("100 000", "Sport", "Which country made his debut in a Soccer World Cup in WC Russia 2018?", ["Peru", "Syria", "Saudi Arabia", "Iceland"], "It has about 335 000 inhabitants.", "49% Iceland<br>45% Syria<br>5% Saudi Arabia<br>1% Peru", "Peru", "Syria"),
			new questions("100 000", "History", "In Egyptian hieroglyphic alphabet, the lion represents which letter?", ["G", "Z", "A", "L"], "They used to add a letter to the hieroglyphes based on the picture's egyptian name.", "58% L<br>24% A<br>15% Z<br>3% G", "G", "Z"),
			new questions("100 000", "Entertainment", "Which movie won the Oscar 2017 Best Pictures?", ["Arrival", "Lion", "La La Land", "Moonlight"], "The presenters declared accidentaly the wrong movie as the winner.", "65% La La Land<br>23% Moonlight<br>7% Arrival<br>5% Lion", "La La Land", "Lion")
			]
        ];
    
    //Choosing random question
        index = Math.floor(Math.random() * que[pIndex].length);
    
    que[pIndex][index].addData();
    que[pIndex][index].removing();
    que[pIndex][index].correct();
    que[pIndex][index].shuffle();
    useHelps(que[pIndex][index]);
    resetHelps();
    pIndex++;    
    
    });//end of execution
	/****************************PROVE TESTING**************************/
	var fire = setInterval(plas, 1500);
	function plas() {
		var paint = "rgba(" + Math.floor(Math.random()*255) + ", " + Math.floor(Math.random()*255) + ", " + Math.floor(Math.random()*255) + ", 1)";
		$(".fishek").css("background-color", paint);
		$(".fishek").css("boxShadow", "2px 2px 10px "+paint+",-2px 2px 10px "+paint+",2px -2px 10px "+paint+",-2px -2px 10px "+paint);
	}
});