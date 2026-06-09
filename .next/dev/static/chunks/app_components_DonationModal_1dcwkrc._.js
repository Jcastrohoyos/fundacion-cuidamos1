(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/DonationModal/DonationModal.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "DonationModal-module__bHyBSa__button",
  "buttonIcon": "DonationModal-module__bHyBSa__buttonIcon",
  "closeButton": "DonationModal-module__bHyBSa__closeButton",
  "container": "DonationModal-module__bHyBSa__container",
  "donaciones": "DonationModal-module__bHyBSa__donaciones",
  "heartbeat": "DonationModal-module__bHyBSa__heartbeat",
  "iframe": "DonationModal-module__bHyBSa__iframe",
  "modalContent": "DonationModal-module__bHyBSa__modalContent",
  "modalOverlay": "DonationModal-module__bHyBSa__modalOverlay",
  "modalWrapper": "DonationModal-module__bHyBSa__modalWrapper",
  "pulse": "DonationModal-module__bHyBSa__pulse",
  "stickyButton": "DonationModal-module__bHyBSa__stickyButton",
  "title": "DonationModal-module__bHyBSa__title",
});
}),
"[project]/app/components/DonationModal/DonationModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DonationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/DonationModal/DonationModal.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DonationModal() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonationModal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo('.donation-modal-content', {
                    opacity: 0,
                    scale: 0.9,
                    y: 50
                }, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo('.donation-modal-overlay', {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.3
                });
            } else {
                document.body.style.overflow = 'unset';
            }
            return ({
                "DonationModal.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["DonationModal.useEffect"];
        }
    }["DonationModal.useEffect"], [
        isOpen
    ]);
    const handleClose = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.donation-modal-content', {
            opacity: 0,
            scale: 0.9,
            y: 50,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: ()=>setIsOpen(false)
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.donation-modal-overlay', {
            opacity: 0,
            duration: 0.3
        });
    };
    const handleEscKey = (e)=>{
        if (e.key === 'Escape') handleClose();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonationModal.useEffect": ()=>{
            if (isOpen) {
                window.addEventListener('keydown', handleEscKey);
                return ({
                    "DonationModal.useEffect": ()=>window.removeEventListener('keydown', handleEscKey)
                })["DonationModal.useEffect"];
            }
        }
    }["DonationModal.useEffect"], [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stickyButton,
                onClick: ()=>setIsOpen(true),
                "aria-label": "Abrir formulario de donación",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonIcon,
                        children: "❤"
                    }, void 0, false, {
                        fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    "Donaciones"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOverlay,
                "donation-modal-overlay": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalWrapper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].closeButton,
                            onClick: handleClose,
                            "aria-label": "Cerrar modal",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalContent,
                            "donation-modal-content": true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                src: "/donation-form",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iframe,
                                title: "Formulario de donación"
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(DonationModal, "z4/TEfseuHPk8234tSd56RcHb38=");
_c = DonationModal;
var _c;
__turbopack_context__.k.register(_c, "DonationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_DonationModal_1dcwkrc._.js.map