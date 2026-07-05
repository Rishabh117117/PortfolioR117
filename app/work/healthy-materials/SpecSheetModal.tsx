"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  PKG_PROJECT,
  PKG_HONESTY,
  fmtUSD,
  fmtCarbon,
  type PackageScope,
  type PackageTotals,
} from "@/lib/hmPackages";
import s from "./PackagesApp.module.css";
import { HM_ROOT_STYLE } from "./theme";

/**
 * The exported spec sheet — a modal preview with CSV download and
 * copy-to-clipboard. Rendered through a portal to <body>: the page keeps
 * content on a z-index:1 layer, so an inline fixed overlay would be trapped
 * beneath the sticky nav (the Housing Works lightbox gotcha). Because the
 * portal escapes the page wrapper that scopes the sage accent, HM_ROOT_STYLE
 * is re-applied on the overlay so the sheet matches the app (not global blue).
 */

export default function SpecSheetModal({
  scope,
  active,
  totals,
  onClose,
}: {
  scope: PackageScope;
  active: Record<string, boolean>;
  totals: PackageTotals;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    // the portal renders one frame after mount — focus once it exists
    if (mounted) closeRef.current?.focus();
  }, [mounted]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rows = scope.lines.map((l) => {
    const on = active[l.id] !== false;
    const chosen = on ? l.swap : l.bau;
    return {
      line: l,
      on,
      chosen,
      lineTotal: l.qty * chosen.unitCost,
      lineDelta: l.qty * (chosen.unitCost - l.bau.unitCost),
    };
  });

  function downloadCsv() {
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const header = [
      "Category",
      "Selection",
      "Specified",
      "Detail",
      "Qty",
      "Unit",
      "Unit cost USD",
      "Line total USD",
      "kgCO2e per unit",
      "Line kgCO2e",
      "VOC",
      "VE read",
      "Certifications",
    ].join(",");
    const body = rows.map(({ line, on, chosen, lineTotal }) =>
      [
        esc(line.category),
        esc(on ? "healthy swap" : "business as usual"),
        esc(chosen.name),
        esc(chosen.detail),
        line.qty,
        esc(line.unit),
        chosen.unitCost,
        Math.round(lineTotal),
        chosen.carbon,
        Math.round(line.qty * chosen.carbon),
        esc(chosen.voc),
        esc(line.ve),
        esc(on ? line.certs.join(" · ") : "—"),
      ].join(","),
    );
    const foot = [
      "",
      `# ${PKG_PROJECT.name} — ${scope.label} (${scope.areaNote})`,
      `# Package ${fmtUSD(totals.pkgCost)} vs BAU ${fmtUSD(totals.bauCost)} (${totals.costDelta >= 0 ? "+" : ""}${totals.costDeltaPct.toFixed(1)}% first cost)`,
      `# Embodied carbon ${fmtCarbon(totals.pkgCarbon)} vs ${fmtCarbon(totals.bauCarbon)} (${Math.round(totals.carbonDeltaPct)}%)`,
      `# ${PKG_HONESTY}`,
    ];
    const blob = new Blob([[header, ...body, ...foot].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hm-package-${scope.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copySummary() {
    const text = [
      `Healthy Materials Package — ${scope.label} · ${PKG_PROJECT.name}`,
      ...rows.map(
        ({ line, on, chosen, lineTotal }) =>
          `• ${line.category}: ${chosen.name}${on ? "" : " (BAU kept)"} — ${line.qty} ${line.unit} · ${fmtUSD(lineTotal)}`,
      ),
      `Package ${fmtUSD(totals.pkgCost)} vs BAU ${fmtUSD(totals.bauCost)} (${totals.costDelta >= 0 ? "+" : ""}${totals.costDeltaPct.toFixed(1)}%) · carbon ${Math.round(totals.carbonDeltaPct)}% · ${totals.healthCleared}/${totals.healthFlags} VOC sources cleared`,
      PKG_HONESTY,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div className={s.sheetOverlay} style={HM_ROOT_STYLE} onClick={onClose}>
      <div
        className={s.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={`Spec sheet — ${scope.label}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={s.sheetHead}>
          <div>
            <p className={s.sheetKicker}>healthy materials package · spec sheet</p>
            <h3 className={s.sheetTitle}>
              {PKG_PROJECT.name} — {scope.label}
            </h3>
            <p className={s.sheetMeta}>
              {PKG_PROJECT.meta} · {scope.areaNote} · {PKG_PROJECT.standard}
            </p>
          </div>
          <button ref={closeRef} type="button" className={s.sheetClose} onClick={onClose} aria-label="Close spec sheet">
            ✕
          </button>
        </header>

        <div className={s.sheetScroll}>
          <table className={s.sheetTable}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Specified</th>
                <th className={s.num}>Qty</th>
                <th className={s.num}>Unit $</th>
                <th className={s.num}>Line total</th>
                <th className={s.num}>Δ vs BAU</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ line, on, chosen, lineTotal, lineDelta }) => (
                <tr key={line.id} className={on ? "" : s.rowBau}>
                  <td>{line.category}</td>
                  <td>
                    <span className={s.sheetSpec}>{chosen.name}</span>
                    <span className={s.sheetDetail}>
                      {on ? line.certs.join(" · ") : "business as usual kept"}
                    </span>
                  </td>
                  <td className={s.num}>
                    {line.qty.toLocaleString("en-US")} {line.unit}
                  </td>
                  <td className={s.num}>${chosen.unitCost}</td>
                  <td className={s.num}>{fmtUSD(lineTotal)}</td>
                  <td className={`${s.num} ${lineDelta <= 0 ? s.sheetGood : ""}`}>
                    {lineDelta === 0 ? "—" : `${lineDelta > 0 ? "+" : "−"}${fmtUSD(Math.abs(lineDelta)).slice(1)}`}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>Package total · first cost</td>
                <td className={s.num}>{fmtUSD(totals.pkgCost)}</td>
                <td className={s.num}>
                  {totals.costDelta >= 0 ? "+" : "−"}
                  {fmtUSD(Math.abs(totals.costDelta)).slice(1)} ({totals.costDelta >= 0 ? "+" : ""}
                  {totals.costDeltaPct.toFixed(1)}%)
                </td>
              </tr>
              <tr>
                <td colSpan={4}>Embodied carbon (A1–A3)</td>
                <td className={s.num}>{fmtCarbon(totals.pkgCarbon)}</td>
                <td className={`${s.num} ${s.sheetGood}`}>{Math.round(totals.carbonDeltaPct)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <footer className={s.sheetFoot}>
          <span className={s.sheetHonesty}>{PKG_HONESTY}</span>
          <div className={s.sheetActions}>
            <button type="button" className={s.sheetBtn} onClick={copySummary}>
              {copied ? "Copied ✓" : "Copy summary"}
            </button>
            <button type="button" className={`${s.sheetBtn} ${s.sheetBtnPrimary}`} onClick={downloadCsv}>
              Download CSV
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
