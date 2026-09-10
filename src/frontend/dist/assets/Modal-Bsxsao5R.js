import { r as reactExports, j as jsxRuntimeExports, X, a as cn } from "./index-CeuI7PIL.js";
import { B as Button } from "./Card-DVJtgs4C.js";
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className
}) {
  const panelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    if (!open) return;
    const previous = document.activeElement;
    (_a = panelRef.current) == null ? void 0 : _a.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous == null ? void 0 : previous.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center",
      role: "presentation",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                onClose();
              }
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            ref: panelRef,
            open: true,
            "aria-labelledby": "modal-title",
            tabIndex: -1,
            className: cn(
              "relative z-10 m-0 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-elevated outline-none animate-fade-in",
              className
            ),
            "data-ocid": "modal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "modal-title",
                      className: "font-display text-lg font-semibold tracking-tight",
                      children: title
                    }
                  ),
                  description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: onClose,
                    "aria-label": "Close dialog",
                    className: "size-8 shrink-0 rounded-full",
                    "data-ocid": "modal_close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children }),
              footer ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center justify-end gap-2", children: footer }) : null
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M
};
