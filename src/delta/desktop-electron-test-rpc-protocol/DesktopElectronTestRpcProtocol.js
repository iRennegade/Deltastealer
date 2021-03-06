"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpcResponseType = exports.RpcCallType = void 0;
// Incase anything else ever uses the same IPC mechanism, [type] allows listeners to filter in or out
// these specific messages.
// #region RPC Calls. These are sent from the test to Discord.
let RpcCallType;
exports.RpcCallType = RpcCallType;

(function (RpcCallType) {
  RpcCallType[RpcCallType["executeScript"] = 0] = "executeScript";
  RpcCallType[RpcCallType["settings"] = 1] = "settings";
  RpcCallType[RpcCallType["quit"] = 2] = "quit";
  RpcCallType[RpcCallType["domReady"] = 3] = "domReady";
})(RpcCallType || (exports.RpcCallType = RpcCallType = {}));

// #endregion
// #region RPC responses. These are sent from Discord to the test.
let RpcResponseType;
exports.RpcResponseType = RpcResponseType;

(function (RpcResponseType) {
  RpcResponseType[RpcResponseType["control"] = 0] = "control";
  RpcResponseType[RpcResponseType["error"] = 1] = "error";
  RpcResponseType[RpcResponseType["success"] = 2] = "success";
})(RpcResponseType || (exports.RpcResponseType = RpcResponseType = {})); // #endregion
