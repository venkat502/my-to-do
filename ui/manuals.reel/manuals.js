/**
 * @module ui/manuals.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Manuals
 * @extends Component
 */
exports.Manuals = Component.specialize( /** @lends Manuals# */ {
    handleAction: {
        value: function() {
            var manuals = this.templateObjects.manuals;
            searchtext = $("#search-text").val();
            catid = $("#category").val();
            pageNumber = $("#pageNumber").val();
            limit = $("#limit").val();

            if (catid == null) {
                catid = "*";
            }

            if (pageNumber == null) {
                pageNumber = 1;
            }

            if (limit == null) {
                limit = 20;
            }


            $("#searchform").submit(function(e) {
                e.preventDefault();
                $.ajax({
                    url: 'http://vman.ngrok.com/_api/manuals/search.json',
                    type: 'get',
                    data: {
                        searchText: searchtext,
                        catid: catid,
                        pn: pageNumber,
                        limit: limit
                    }
                }).done(function(data) {
                    console.log("success");
                    console.log(data.code);
                    console.log(data.message);
                    var myarr = [];
                    if (data.data.hits.hits.length > 0) {
                        for (i = 0; i < data.data.hits.hits.length; i++) {
                            myarr[i] = {
                                "manual": data.data.hits.hits[i]
                            };
                        }
                        manuals.content = myarr;
                    } else {
                        $(".results").empty().append("No Results Found");
                    }
                }).fail(function(data) {
                    console.log("error");
                }).always(function() {
                    console.log("complete");
                });
            });
        }
    }
});