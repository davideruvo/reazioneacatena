import React from "react";
import { BlockPicker } from "react-color";

import styles from "#styles/utils.module.sass";

const Button = ({ ico, text, title, size, style, disabled, onClick }) => {
  return (
    <button
      className={`${styles.button} ${
        styles[size ? "size" + size.toUpperCase() : "sizeM"]
      }`}
      title={title || text}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {ico && <Icon ico={ico} />}
      {text ?? null}
    </button>
  );
};

const ButtonBar = ({ buttons, size, style }) => {
  return (
    <div className={styles.buttonBar} style={style}>
      {buttons
        .filter((x) => !x.hidden)
        .map((x, i) => (
          <Button key={i} size={size} {...x} />
        ))}
    </div>
  );
};

const ButtonConfirmBar = ({ text, onConfirm, onCancel, size, style }) => {
  const buttons = [
    {
      ico: "check",
      title: "OK",
      onClick: onConfirm,
    },
    {
      ico: "xmark",
      title: "No",
      onClick: onCancel,
    },
  ];
  return (
    <>
      {text}
      <ButtonBar
        size={size}
        style={{ marginTop: 10, ...style }}
        buttons={buttons}
      />
    </>
  );
};

const ColorDisplay = ({ color, width, height, margin, title, style, onClick }) => {
  return (
    <div
      className={styles.colorDisplay}
      title={title}
      style={{
        background: color,
        width: width ? width : height,
        height: height ? height : width,
        margin: margin ? margin : 0,
        ...style
      }
      }
      onClick={onClick}
    ></div>
  );
};

const ColorPicker = ({ color, size, className, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const handleChange=(color)=>{onChange(color.hex)};

  return (
    <div className={`${className}`}>
      {open ? (
        <div className={`${styles.colorPicker}`}>
          <Icon title="Chiudi" ico="circle-xmark" icoStyle="regular" onClick={()=>setOpen(false)} />
          <BlockPicker
            color={color ?? '#000'}
            triangle="hide"
            width={null}
            colors={[
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
              "#ffeb3b",
              "#ffc107",
              "#ff9800",
              "#ff5722",
              "#795548",
              "#607d8b",
            ]}
            onChange={handleChange}
          />
        </div>
      ) : (
        <ColorDisplay
            title="Modifica"
            color={color}
            width={size}
            style={{cursor:'pointer', border: '2px solid var(--primary-bgcolor)'}}
          onClick={() => setOpen(true)}
          />
      )}
    </div>
  );
};

const Icon = ({ ico, icoStyle, text, title, style, onClick }) => {
  return (
    <i
      style={style}
      title={title}
      onClick={onClick}
      className={`${styles.icon} fa-${ico} ${(icoStyle ?? "solid")
        .split(",")
        .map((x) => `fa-${x.trim()}`)
        .join(" ")}`}
    >
      {text ?? ""}
    </i>
  );
};

const Overlay = ({ children, style, onClick }) => {
  return (
    <div className={styles.overlay} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export {
  Button,
  ButtonBar,
  ButtonConfirmBar,
  ColorDisplay,
  ColorPicker,
  Icon,
  Overlay,
};
