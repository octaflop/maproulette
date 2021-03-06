jQuery.fn.extend({
  /*
  # Returns get parameters.
  #
  # If the desired param does not exist, null will be returned
  #
  # To get the document params:
  # @example value = $(document).getUrlParam("paramName");
  #
  # To get the params of a html-attribut (uses src attribute)
  # @example value = $('#imgLink').getUrlParam("paramName");
  */

  getUrlParam: function(strParamName) {
    var qString, query, returnVal, strHref, strQueryString;
    strParamName = escape(unescape(strParamName));
    if ($(this).attr("nodeName") === "#document") {
      if (window.location.search.search(strParamName) > -1) {
        qString = window.location.search.substr(1, window.location.search.length).split("&");
      }
    } else if ($(this).attr("src") !== "undefined") {
      strHref = $(this).attr("src");
      if (strHref.indexOf("?") > -1) {
        strQueryString = strHref.substr(strHref.indexOf("?") + 1);
        qString = strQueryString.split("&");
      }
    } else if ($(this).attr("href") !== "undefined") {
      strHref = $(this).attr("href");
      if (strHref.indexOf("?") > -1) {
        strQueryString = strHref.substr(strHref.indexOf("?") + 1);
        qString = strQueryString.split("&");
      }
    } else {
      return null;
    }
    if (!qString) {
      return null;
    }
    returnVal = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = qString.length; _i < _len; _i++) {
        query = qString[_i];
        if (escape(unescape(query.split("=")[0])) === strParamName) {
          _results.push(query.split("=")[1]);
        }
      }
      return _results;
    })();
    if (returnVal.lenght === 0) {
      return null;
    } else if (returnVal.lenght === 1) {
      return returnVal[0];
    } else {
      return returnVal;
    }
  }
});

var setDelay = function(seconds, func) {
  /*
  # Wraps setTimeout to make it easiet to write in Coffeescript
  */

  return setTimeout(func, seconds * 1000);
};

var nomToString = function(addr) {
  /*
    # Takes a geocode object returned from Nominatim and returns a
    # nicely formatted string
  */
  
  var county, locality, str, town;
  str = "";
  if (addr.city != null) {
    locality = addr.city;
  } else {
    if (addr.town != null) {
      town = addr.town;
    } else if (addr.hamlet != null) {
      town = addr.hamlet;
    } else {
      town = "Somewhere in";
    }
    if (addr.county != null) {
      if (addr.county.toLowerCase().indexOf('county') > -1) {
        county = ", " + addr.county;
      } else {
        county = ", " + addr.county + " County";
      }
    } else {
      county = "";
    }
    locality = "" + addr.town + " " + county;
  }
  if (addr.state != null) {
    return "" + locality + ", " + addr.state;
  } else {
    if (addr.country != null) {
      return "" + locality + ", " + addr.country;
    } else {
      return "Somewhere on Earth";
    }
  }
};
