(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/DonationModal/DonationModal.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buttonIcon": "DonationModal-module__bHyBSa__buttonIcon",
  "closeButton": "DonationModal-module__bHyBSa__closeButton",
  "heartbeat": "DonationModal-module__bHyBSa__heartbeat",
  "modalContent": "DonationModal-module__bHyBSa__modalContent",
  "modalOverlay": "DonationModal-module__bHyBSa__modalOverlay",
  "modalWrapper": "DonationModal-module__bHyBSa__modalWrapper",
  "pulse": "DonationModal-module__bHyBSa__pulse",
  "stickyButton": "DonationModal-module__bHyBSa__stickyButton",
});
}),
"[project]/app/components/DonationForm/DonationForm.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "DonationForm-module__Xj1ebq__active",
  "amountButton": "DonationForm-module__Xj1ebq__amountButton",
  "amountOptions": "DonationForm-module__Xj1ebq__amountOptions",
  "customAmount": "DonationForm-module__Xj1ebq__customAmount",
  "disclaimer": "DonationForm-module__Xj1ebq__disclaimer",
  "donationForm": "DonationForm-module__Xj1ebq__donationForm",
  "form": "DonationForm-module__Xj1ebq__form",
  "input": "DonationForm-module__Xj1ebq__input",
  "inputGroup": "DonationForm-module__Xj1ebq__inputGroup",
  "label": "DonationForm-module__Xj1ebq__label",
  "section": "DonationForm-module__Xj1ebq__section",
  "sectionTitle": "DonationForm-module__Xj1ebq__sectionTitle",
  "submitButton": "DonationForm-module__Xj1ebq__submitButton",
  "submitSection": "DonationForm-module__Xj1ebq__submitSection",
  "subtitle": "DonationForm-module__Xj1ebq__subtitle",
  "successIcon": "DonationForm-module__Xj1ebq__successIcon",
  "successMessage": "DonationForm-module__Xj1ebq__successMessage",
  "successPulse": "DonationForm-module__Xj1ebq__successPulse",
  "successText": "DonationForm-module__Xj1ebq__successText",
  "successTitle": "DonationForm-module__Xj1ebq__successTitle",
  "textarea": "DonationForm-module__Xj1ebq__textarea",
  "title": "DonationForm-module__Xj1ebq__title",
});
}),
"[project]/app/components/DonationForm/DonationForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DonationForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@gsap/react/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/DonationForm/DonationForm.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function DonationForm({ onClose }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        amount: '',
        customAmount: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"])({
        "DonationForm.useGSAP": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from('.donation-form-item', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    }["DonationForm.useGSAP"], {
        scope: containerRef
    });
    const handleAmountChange = (amount)=>{
        setFormData({
            ...formData,
            amount,
            customAmount: ''
        });
    };
    const handleCustomAmountChange = (e)=>{
        setFormData({
            ...formData,
            customAmount: e.target.value,
            amount: 'custom'
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount;
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    amount: finalAmount,
                    message: formData.message
                })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                if (data.data.checkout_url) {
                    window.location.href = data.data.checkout_url;
                } else {
                    setIsSubmitting(false);
                    setSubmitted(true);
                    setTimeout(()=>{
                        if (onClose) onClose();
                        setSubmitted(false);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            amount: '',
                            customAmount: '',
                            message: ''
                        });
                    }, 3000);
                }
            } else {
                throw new Error(data.error || 'Error al procesar el pago');
            }
        } catch (error) {
            console.error('Error al procesar donación:', error);
            alert('Error al procesar la donación. Por favor intenta nuevamente.');
            setIsSubmitting(false);
        }
    };
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    if (submitted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successMessage,
            ref: containerRef,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successIcon,
                    children: "✓"
                }, void 0, false, {
                    fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successTitle,
                    children: "¡Gracias por tu donación!"
                }, void 0, false, {
                    fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successText,
                    children: "Tu aporte hará una gran diferencia en la vida de muchos niños y familias."
                }, void 0, false, {
                    fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].donationForm,
        ref: containerRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title} donation-form-item`,
                children: "Haz tu donación"
            }, void 0, false, {
                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle} donation-form-item`,
                children: "Tu apoyo transforma vidas"
            }, void 0, false, {
                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section} donation-form-item`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                children: "Selecciona el monto"
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].amountOptions,
                                children: [
                                    [
                                        '10000',
                                        '25000',
                                        '50000',
                                        '100000'
                                    ].map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].amountButton} ${formData.amount === amount ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                            onClick: ()=>handleAmountChange(amount),
                                            children: [
                                                "$",
                                                parseInt(amount).toLocaleString('es-CO')
                                            ]
                                        }, amount, true, {
                                            fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: "Otro monto",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customAmount} ${formData.amount === 'custom' ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                        value: formData.customAmount,
                                        onChange: handleCustomAmountChange
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section} donation-form-item`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                children: "Información del donante"
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "name",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: "Nombre completo *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "name",
                                        name: "name",
                                        required: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        value: formData.name,
                                        onChange: handleChange,
                                        placeholder: "Tu nombre completo"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "email",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: "Correo electrónico *"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        id: "email",
                                        name: "email",
                                        required: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        value: formData.email,
                                        onChange: handleChange,
                                        placeholder: "tu@email.com"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "phone",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: "Teléfono"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "tel",
                                        id: "phone",
                                        name: "phone",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        value: formData.phone,
                                        onChange: handleChange,
                                        placeholder: "+57 300 123 4567"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section} donation-form-item`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                children: "Mensaje (opcional)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                name: "message",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                value: formData.message,
                                onChange: handleChange,
                                placeholder: "Deja un mensaje de aliento...",
                                rows: 4
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitSection} donation-form-item`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton,
                                disabled: isSubmitting,
                                children: isSubmitting ? 'Procesando...' : 'Donar Ahora'
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].disclaimer,
                                children: "Tu donación es segura y privada. Aceptamos tarjetas de crédito, débito y transferencias bancarias."
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/DonationForm/DonationForm.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(DonationForm, "w/HDaFp3qulxU6OcTzlSo/7v9AY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"]
    ];
});
_c = DonationForm;
var _c;
__turbopack_context__.k.register(_c, "DonationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/DonationForm/DonationForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
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
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(`.${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalContent}`, {
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
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(`.${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOverlay}`, {
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(`.${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalContent}`, {
            opacity: 0,
            scale: 0.9,
            y: 50,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: ()=>setIsOpen(false)
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(`.${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOverlay}`, {
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
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    "Donaciones"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOverlay,
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
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationModal$2f$DonationModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalContent,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$DonationForm$2f$DonationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClose: handleClose
                            }, void 0, false, {
                                fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/DonationModal/DonationModal.tsx",
                lineNumber: 71,
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

//# sourceMappingURL=app_components_1i50ijw._.js.map