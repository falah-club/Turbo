var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// Button.tsx
import { jsx } from "react/jsx-runtime";
function Button(_a) {
  var _b = _a, {
    color = "primary",
    style,
    children
  } = _b, props = __objRest(_b, [
    "color",
    "style",
    "children"
  ]);
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({
      style: __spreadValues({
        padding: "0 16px",
        height: "40px",
        backgroundColor: color === "primary" ? "#f50076" : "#773752",
        color: "white",
        borderRadius: "4px",
        fontSize: "14px",
        outline: "none",
        border: "none"
      }, style)
    }, props), {
      children
    })
  );
}

// useAppShell.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
var useAppShell = create()(
  persist(
    (set) => ({
      user: null,
      score: 0,
      setUser: (user) => set({ user }),
      addScore: (amount) => set((state) => ({ score: state.score + amount }))
    }),
    {
      name: "app-shell"
      // localStorage 내 저장될 states 값을 관리하는 key
    }
  )
);

// Shell.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
function Shell({ title, children }) {
  const { user, score, setUser } = useAppShell();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "header",
      {
        style: {
          position: "sticky",
          top: "0",
          zIndex: "10",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#c7c2c2"
        },
        children: [
          /* @__PURE__ */ jsx2("h1", { children: title }),
          /* @__PURE__ */ jsx2("div", { children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("span", { style: { fontSize: "18px", marginRight: "16px" }, children: [
              user,
              " - \uC810\uC218: ",
              score
            ] }),
            /* @__PURE__ */ jsx2(Button, { onClick: () => setUser(null), children: "Logout" })
          ] }) : /* @__PURE__ */ jsx2(Button, { onClick: () => setUser("ckstn0777"), children: "Login" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx2(
      "main",
      {
        style: {
          position: "absolute",
          inset: "0",
          backgroundColor: "#e9e7e7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        children
      }
    )
  ] });
}
export {
  Button,
  Shell,
  useAppShell
};
