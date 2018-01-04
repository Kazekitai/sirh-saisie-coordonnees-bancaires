
var DepartementsModule = (function(){
    var self = {};

    //methodes publiques
    self.init =  function() {
        getDepartementsFromAPI();
    };

    function getDepartementsFromAPI() {
        var departementshtmlSelectOptions ="";
        var serverUrl = "http://localhost:8080/api/departements";
        $.get( serverUrl, function( data ) {
            console.log( "Data Loaded: ", data );
            console.log("data size ", data.length);
            departementshtmlSelectOptions += "<option value=\"0\" selected>Tous</option>";
            for(var i=0;i<data.length;i++) {
                departementshtmlSelectOptions += "<option value=\""+ data[i].id+ "\">" + data[i].nom + "</option>";
            }
            $("#choixDept").append(departementshtmlSelectOptions);
        }).fail(function() {
            console.log( "error get" );
        });
    }


    return self;
})();

var CollaborateursModule = (function(){
    var self = {};

    //methodes publiques
    self.init =  function() {
        getCollaborateursFromAPI();
    };

    function getCollaborateursFromAPI() {
        console.log( "pass " );
        var listeCollaborateursHtml ="";
        var serverUrl = "http://localhost:8080/api/collaborateurs";
        $.get( serverUrl, function( data ) {
            console.log( "Data Loaded: ", data );
            console.log("data size ", data.length);
            for(var i=0;i<data.length;i++) {
                listeCollaborateursHtml += "<tr class=\"active\">"
                    +"<td>" + data[i].matricule + "</td>"
                    +"<td>" + data[i].nom + "</td>"
                    +"<td>" + data[i].prenom + "</td>"
                    +"<td>"+"<a href=\"#\" class=\"btn btn-success tooltips modif-btn\" data-placement=\"top\" data-toggle=\"tooltip\" data-original-title=\"Edit\""
                    +" data-matricule=\""+ data[i].matricule +"\"  onClick=\"ModifierBanqueModule.getCoordoonneesFromAPI()\">"
                    +"<i class=\"glyphicon glyphicon-pencil\" data-matricule=\""+ data[i].matricule +"\"></i>"
                    +"</a></td>"
                    +"</tr>";
            }          

            $("#listecollabs").append(listeCollaborateursHtml);
        }).fail(function() {
            console.log( "error get" );
        });
    }

    self.getCollaborateursFromAPIFilter = function (filter) {
        console.log( "pass " );
        var listeCollaborateursHtml ="";
        var serverUrl = "http://localhost:8080/api/collaborateurs";
        if(filter && !filter.length) {
            serverUrl = "http://localhost:8080/api/collaborateurs/"+ filter.nom + "/" + filter.identifiant;
        }         
        $.get( serverUrl, function( data ) {
            console.log( "Data Loaded: ", data );
            console.log("data size ", data.length);
            for(var i=0;i<data.length;i++) {
                listeCollaborateursHtml += "<tr class=\"active\">"
                    +"<td>" + data[i].matricule + "</td>"
                    +"<td>" + data[i].nom + "</td>"
                    +"<td>" + data[i].prenom + "</td>"
                    +"<td>"+"<a href=\"#\" class=\"btn btn-success tooltips modif-btn\" data-placement=\"top\" data-toggle=\"tooltip\" data-original-title=\"Edit\""
                    +" data-matricule=\""+ data[i].matricule +"\"  onClick=\"ModifierBanqueModule.getCoordoonneesFromAPI()\">"
                    +"<i class=\"glyphicon glyphicon-pencil\" data-matricule=\""+ data[i].matricule +"\"></i>"
                    +"</a></td>"
                    +"</tr>";
            }          

            $("#listecollabs").append(listeCollaborateursHtml);
        }).fail(function() {
            console.log( "error get" );
        });
    }


    return self;
})();


ModifierBanqueModule = (function(){
    var self = {};
    var serverUrl = "http://localhost:8080/api/collaborateurs/";;

    //methodes publiques

    self.modifier =  function() {
        event.preventDefault();
        $('#updatebox').hide();
        var matricule = $( "input[name=matricule]").val();
        var collab = {
            banque: $( "input[name=banque]").val(),
            bic: $( "input[name=bic]").val(),
            ban: $( "input[name=ban]").val()
        };
        console.log( "matricule: " +  matricule);
        console.log(collab);
        $.ajax({ 
            type: 'PUT', 
            url: serverUrl + matricule + "/banque",
            data: collab,
            dataType: 'json' 
        }); 
    };


    self.getCoordoonneesFromAPI = function() {
        event.preventDefault();
        $('#updatebox').show();
        var listeCollaborateursHtml ="";
        var matricule = $(event.target).data("matricule");
        $.get( serverUrl + matricule + "/banque", function( data ) {
            console.log( "Data Loaded: ", data );
            $( "input[name=matricule]").val(matricule);
            $( "input[name=banque]").val(data.banque);
            $( "input[name=bic]").val(data.bic);
            $( "input[name=ban]").val(data.ban);
        }).fail(function() {
            console.log( "error get" );
        });
    }


    return self;
})();

RechercheModule = (function() {
    var self = {};

    self.rechercher = function() {
        // Tester s'il n'y a aucun filtre
        console.log($("#choixDept").val());
        console.log($( "input[name=rechercheCollab]" ).val());
        if ($("#choixDept").val() == "0" && $("input[name=rechercheCollab]" ).val() == "" ) {
            $("#listecollabs").empty();
            CollaborateursModule.init();
        } else {
            if($("#choixDept").val() != "0"  && $("input[name=rechercheCollab]" ).val() == "" ) {
                // selectionner le departement dans le select
                $("#choixDept").attr("selected","selected");
                // filtrer le departement
                console.log("filtre par département");
                var filter = {
                    nom: "departement",
                    identifiant: $("#choixDept").val()
                };
                $("#listecollabs").empty();
                CollaborateursModule.getCollaborateursFromAPIFilter(filter);
            } else {
                // filtrer par le nom
                var filter = {
                    nom: "nom",
                    identifiant: $("input[name=rechercheCollab]" ).val()
                };
            } 
            
        }
    };

    return self;

})();

DepartementsModule.init();
CollaborateursModule.init();