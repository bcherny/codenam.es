"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
require("./HomePage.css");
function HomePage() {
    var _a = React.useState(false), showJoinRoom = _a[0], setShowJoinRoom = _a[1];
    return (<div className="home-page">
      <h1 className="title">CodeNames</h1>
      <div className="buttons-container">
        <button className="create-room">Create Room</button>
        {showJoinRoom === false ? (<button className="join-room" onClick={function () {
        setShowJoinRoom(true);
    }}>
            Join Room
          </button>) : (<input type="text" className="join-room-input" placeholder="Room Code:"/>)}
      </div>
    </div>);
}
exports.default = HomePage;
