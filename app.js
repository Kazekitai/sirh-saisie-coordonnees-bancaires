
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
                    +"<i class=\"glyphicon glyphicon-pencil\"></i>"
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

    //methodes publiques

    self.modifier =  function() {
        getCollaborateursFromAPI();
    };


    self.getCoordoonneesFromAPI = function() {
        event.preventDefault();
        $('#updatebox').show();
        console.log( "pass " );
        var matricule = $(event.target).data("matricule");
        var listeCollaborateursHtml ="";
        var serverUrl = "http://localhost:8080/api/collaborateurs/" + matricule + "/banque";
        $.get( serverUrl, function( data ) {
            console.log( "Data Loaded: ", data );
            console.log("data size ", data.length);
            $( "input[name=banque]").val(data.Banque);
            $( "input[name=bic]").val(data.Bic);
            $( "input[name=ban]").val(data.Ban);
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
        if ($("#choixDept").val("0") && $("input[name=rechercheCollab]" ).val("") ) {
            
        } else {
            if(!$("#choixDept").val("0") && $("input[name=rechercheCollab]" ).val("")) {
                // selectionner le departement dans le select
                $("#choixDept").attr("selected","selected");
                // filtrer le departement
            } else {
                // filtrer par le nom
            } 
            
                      
            
            
        }
    };

    return self;

})();

DepartementsModule.init();
CollaborateursModule.init();