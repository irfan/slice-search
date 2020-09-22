/**
 * @Author  : Irfan Durmus <irfandurmus at gmail dot com> http://irfandurmus.com
 * @License : GPL (see http://www.gnu.org/licenses/gpl.txt)
 *
 * @Description
 * Created: 22 September 2020
 * If you make any improvement, you must share your updates publicly
 *
 *
 * The x1 and y1 coordinates represents most top-left corner while
 * x2,y2 represents coordinate of the most bottom-right corner.
 *
 * The coordinates you are passing should be in this structure.
 *
 */

function GridCoordinates(data, config) {

    // calculated size of each inner box
    this.size = {width:0, height:0}

    // the calculated result, flat array
    this.result = [];

    if (data === undefined) {
        data = {x1:0,x2:0,y1:0,y2:0}
        console.error('Please pass data object that contains a valid coordinates, i.e:',{ x1:-6, x2:3, y1:-2, y2:7});
    }

    if (!config) {
        config = {}
    }

    if (config.splitMode && config.splitMode !== 'squareRoot') {
        console.error('Invalid splitMode passed in the config');
    }

    this.config = Object.assign({
        autoSplit: true,
        splitMode: 'squareRoot',
        autoCalculate: true,
    }, config);

    this.data = {
        'x1': data.x1,
        'x2': data.x2,
        'y1': data.y1,
        'y2': data.y2
    }

    if (this.config.autoSplit && this.config.splitMode === 'squareRoot') {
        this.widthSquareRoot().heightSquareRoot();
    }

    if (this.config.autoCalculate) {
        this.createSubCoordinates();
    }
}

GridCoordinates.prototype = {

    widthSquareRoot: function () {
		var w = this.data.x1 - this.data.x2;
        if (w < 0) {
            w = w * -1;
        }
        this.size.width = Math.ceil(Math.sqrt(w));
        return this;
    },

    heightSquareRoot: function () {
		var h = this.data.y1 - this.data.y2;
        if (h < 0) {
            h = h * -1;
        }
        this.size.height = Math.ceil(Math.sqrt(h));
        return this;
    },

    // the loop to create multiple objects
    createSubCoordinates: function() {
        var i = 0, ii = 0;
        for (i=0; i<this.size.height; i++) {
            for (ii = 0; ii<this.size.width; ii++) {
                this.checkValidity(
                    this.createCell(i,ii)
                );
            }
            ii = 0;
        }
    },

    // creates and returns an object for each coordinate
    createCell: function(i,ii) {
        var cell = {};
        cell.x1 = this.data.x1 + (this.size.width * ii);
        cell.x2 = cell.x1 + this.size.width;
        cell.y1 = this.data.y1 - (this.size.height * i);
        cell.y2 = cell.y1 - this.size.height;
        return cell;
    },

    // TODO: check if the area of the small box overflows
    // from any border, if a corner overflows make the
    // box narrow or short.
    checkValidity: function(cell) {

        if(cell.x2 > this.data.x2) {
            cell.x2 = this.data.x2;
        }

        if(cell.y2 < this.data.y2) {
            cell.y2 = this.data.y2;
        }

        if (cell.x1 <= this.data.x2 && cell.y1 > this.data.y2) {
            this.result.push(cell);
        }
    },
    // return the result flat array
    print: function() {
        console.log(this.result);
    },
    // return the result flat array
    getResult: function() {
        return this.result;
    },

    // shows prototype and object to debug
    debug: function() {
        console.log(Object.assign({}, this, this.__proto__));
    }
}

var a = new GridCoordinates({x1:-20,x2:45,y1:20,y2:-45});
var b = new GridCoordinates({x1:-8,x2:8,y1:8,y2:-8});
var c = new GridCoordinates({x1:-6,x2:4,y1:9,y2:-2});

a.print();
b.print();
c.print();



