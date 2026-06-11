"use client";

import { useMemo, useState } from "react";

import styles from "../../admin.module.css";

export default function StatusControls({ currentStatus, options }) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus.value);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedStatus) || currentStatus,
    [currentStatus, options, selectedStatus],
  );
  const hasLocalChange = selectedStatus !== currentStatus.value;

  return (
    <section className={`${styles.panel} ${styles.statusControlPanel}`} aria-labelledby="status-control-title">
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Local status</p>
          <h2 id="status-control-title">Update preview</h2>
        </div>
        <span className={styles.panelBadge}>Browser only</span>
      </div>

      <div className={styles.localStatusNotice} role="status">
        <strong>{selectedOption.label}</strong>
        <p>{selectedOption.description}</p>
        <small>
          {hasLocalChange
            ? "Preview changed locally. Refreshing or leaving this page restores mock data."
            : "Matches the saved mock status for this inquiry."}
        </small>
      </div>

      <div className={styles.statusButtonGrid} aria-label="Choose a local status preview">
        {options.map((option) => {
          const isSelected = option.value === selectedStatus;

          return (
            <button
              aria-pressed={isSelected}
              className={`${styles.statusChoice} ${isSelected ? styles.statusChoiceActive : ""}`}
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              type="button"
            >
              <span>{option.label}</span>
              <small>{option.description}</small>
            </button>
          );
        })}
      </div>

      <button
        className={styles.secondaryButton}
        disabled={!hasLocalChange}
        onClick={() => setSelectedStatus(currentStatus.value)}
        type="button"
      >
        Reset to mock status
      </button>
    </section>
  );
}
