"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBezierPaths = void 0;
function drawBezierPaths(paths, width, height, fileName, ox, oy) {
    if (ox === void 0) { ox = 0; }
    if (oy === void 0) { oy = 0; }
    var canvas = require('canvas').createCanvas(width, height);
    var context = canvas.getContext('2d');
    context.fillStyle = 'red';
    context.translate(-ox, -oy);
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        context.beginPath();
        context.moveTo(path.knots[0].points[2], path.knots[0].points[3]);
        for (var i = 1; i < path.knots.length; i++) {
            // console.log(path.knots[i].points.map(x => x.toFixed(2)));
            context.bezierCurveTo(path.knots[i - 1].points[4], path.knots[i - 1].points[5], path.knots[i].points[0], path.knots[i].points[1], path.knots[i].points[2], path.knots[i].points[3]);
        }
        if (!path.open)
            context.closePath();
        context.fill();
    }
    require('fs').writeFileSync(fileName, canvas.toBuffer());
}
exports.drawBezierPaths = drawBezierPaths;
//# sourceMappingURL=utils.js.map