import React, { createContext, useContext, useMemo } from "react";

export const PuaDocumentoContext = createContext(null);

export const PuaDocumentoProvider = ({ value, children }) => (
  <PuaDocumentoContext.Provider value={value}>
    {children}
  </PuaDocumentoContext.Provider>
);

export const usePuaDocumento = () => {
  const ctx = useContext(PuaDocumentoContext);
  if (!ctx) {
    throw new Error("usePuaDocumento debe usarse dentro de un PuaDocumentoProvider");
  }
  return ctx;
};

export const usePuaModulo = (slug, defaultValue = {}) => {
  const ctx = usePuaDocumento();
  const modulo = ctx.modulos[slug] || {};
  const data = modulo.data ?? defaultValue;

  const setData = (next) => {
    ctx.updateModuloData(slug, (prev = defaultValue) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      return resolved ?? defaultValue;
    });
  };

  const meta = useMemo(() => ({
    status: modulo.status_revision || "borrador",
    isDirty: Boolean(modulo.isDirty),
    saving: Boolean(modulo.saving),
    lastSavedAt: modulo.lastSavedAt || null,
    save: (status = "borrador") => ctx.saveModulo?.(slug, status),
  }), [modulo.status_revision, modulo.isDirty, modulo.saving, modulo.lastSavedAt, ctx, slug]);

  return [data, setData, meta];
};
