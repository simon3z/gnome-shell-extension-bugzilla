/*
 * gnome-shell-extension-bugzilla
 * Copyright (C) 2012  Federico Simoncelli <federico.simoncelli@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const Main = imports.ui.main;
const Search = imports.ui.search;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Util = imports.misc.util;

const OVERVIEWTITLE = "BUGZILLA";

var BugzillaInst = null;

var BugzillaRegExp = new RegExp("(\\w*)bz#?(\\d+)" ,"i");
var BugzillaSites = [
    { "id": "rh", "name": "Red Hat", "icon": "web-browser",
      "url": "https://bugzilla.redhat.com/show_bug.cgi?id=$0" },
    { "id": "kl", "name": "Kernel", "icon": "web-browser",
      "url": "https://bugzilla.kernel.org/show_bug.cgi?id=$0" },
    { "id": "gm", "name": "Gnome", "icon": "web-browser",
      "url": "https://bugzilla.gnome.org/show_bug.cgi?id=$0" },
    { "id": "fd", "name": "Free Desktop", "icon": "web-browser",
      "url": "https://bugs.freedesktop.org/show_bug.cgi?id=$0" }
];

function BugzillaSearch()
{
    this._init();
}

BugzillaSearch.prototype =
{
    __proto__: Search.SearchProvider.prototype,

    _init: function()
    {
        Search.SearchProvider.prototype._init.call(this, OVERVIEWTITLE);
        return true;
    },

    _findBzSite: function(bzId)
    {
        if (!(matches = BugzillaRegExp.exec(bzId))) return;

        for (let j in BugzillaSites) {
            let bzSiteId = matches[1].toLowerCase();
            if (bzSiteId && bzSiteId == BugzillaSites[j].id) {
                return BugzillaSites[j];
            }
        }

        return;
    },

    getResultMeta: function(resultId)
    {
        let matches, bzSite;

        if (!(bzSite = this._findBzSite(resultId))) return {};

        return {
            "id": resultId,
            "name": (resultId + " (" + bzSite["name"] + ")"),
            "createIcon": function(size) {
                return new St.Icon({ icon_name: bzSite["icon"],
                                     icon_type: St.IconType.FULLCOLOR,
                                     icon_size: size });
            }
        };
    },

    activateResult: function(bzId)
    {
        let bzSite, bzUrl, matches;

        if (!(bzSite = this._findBzSite(bzId))) return;

        /* TODO: optimize this, should be grouped with _findBzSite */
        if (!(matches = BugzillaRegExp.exec(bzId))) return;

        Util.spawn(["/usr/bin/gnome-open",
                    bzSite.url.replace("$0", matches[2])]);
    },

    getInitialResultSet: function(terms)
    {
        let matches, results = [];

        for (let i in terms) {
            if (!(matches = BugzillaRegExp.exec(terms[i]))) continue;

            for (let j in BugzillaSites) {
                let bzSiteId = matches[1].toLowerCase();
                if (bzSiteId && bzSiteId != BugzillaSites[j].id) continue;

                results.push(
                    BugzillaSites[j].id.toUpperCase() + "BZ#" + matches[2]);
            }
        }

        return results;
    },

    getSubsearchResultSet: function(previousResults, terms)
    {
        return this.getInitialResultSet(terms);
    },
}

function init(metadata)
{
    BugzillaInst = new BugzillaSearch();
}

function enable()
{
    Main.overview.addSearchProvider(BugzillaInst);
}

function disable()
{
    Main.overview.removeSearchProvider(BugzillaInst);
}
