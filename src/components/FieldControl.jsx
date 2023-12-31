import { ColorDisplay, ColorPicker, Icon } from "#components/Utils";
import styles from "#styles/fieldcontrol.module.sass";

const FieldControl = ({ field, value, editMode, handleChange, hasError }) => {
  return (
    <>
      <span className={styles.label}>{field.des}</span>
      {field.type === "text" &&
        (editMode ? (
          <input
            type="text"
            placeholder={field.des}
            onChange={(e) => handleChange(field.key, e.target.value)}
            value={value}
            className={hasError ? "error" : ""}
          />
        ) : (
          <span title={value}>{value}</span>
        ))}
      {field.type === "longtext" &&
        (editMode ? (
          <textarea
            rows={5}
            placeholder={field.des}
            onChange={(e) => handleChange(field.key, e.target.value)}
            value={value}
            className={hasError ? "error" : ""}
          />
        ) : (
          <span title={value}>{value}</span>
        ))}
      {field.type === "number" &&
        (editMode ? (
          <input
            type="text"
            placeholder={field.des}
            onChange={(e) =>
              handleChange(
                field.key,
                e.target.value === "" || isNaN(e.target.value)
                  ? ""
                  : Number(e.target.value),
              )
            }
            maxLength={field.maxLength}
            value={value}
            className={hasError ? "error" : ""}
          />
        ) : (
          <span title={value}>{value}</span>
        ))}
      {field.type === "bool" &&
        (editMode ? (
          <select
            onChange={(e) => handleChange(field.key, e.target.value === "1")}
            value={value ? "1" : "0"}
          >
            <option value="1">Sì</option>
            <option value="0">No</option>
          </select>
        ) : (
          <span title={value ? "Sì" : "No"}>{value ? "Sì" : "No"}</span>
        ))}
      {(field.type === "list" || field.type === "multilist") &&
        (editMode ? (
          <select
            multiple={field.type === "multilist"}
            onChange={(e) =>
              handleChange(
                field.key,
                field.type === "multilist"
                  ? Object.keys(e.target.selectedOptions).map(
                      (o) => e.target.selectedOptions[o].value,
                    )
                  : e.target.value,
              )
            }
            value={value}
            className={hasError ? "error" : ""}
          >
            {field.type !== "multilist" && <option value=""></option>}
            {Object.keys(field.values).map((k) => (
              <option key={k} value={k}>
                {field.values[k]}
              </option>
            ))}
          </select>
        ) : field.type === "multilist" ? (
          <span title={value.length ? value.join("; ") : "(nessun valore)"}>
            {value.length ? value.join("; ") : "-"}
          </span>
        ) : (
          <span title={field.values ? field.values[value] : ""}>
            {field.values ? field.values[value] : ""}
          </span>
        ))}
      {field.type === "url" &&
        (editMode ? (
          <input
            type="text"
            placeholder={field.des}
            onChange={(e) => handleChange(field.key, e.target.value)}
            value={value}
            className={hasError ? "error" : ""}
          />
        ) : (
          <span>
            <Icon
              ico="arrow-up-right-from-square"
              title={value}
              onClick={(e) => {
                e.stopPropagation();
                window.open(value);
              }}
            />
          </span>
        ))}
      {field.type === "color" &&
        (editMode ? (
          <ColorPicker
            color={value}
            size={24}
            onChange={(color) => handleChange(field.key, color)}
            className={hasError ? "error" : ""}
          />
        ) : (
          <ColorDisplay color={value} width={16} margin={4} />
        ))}
    </>
  );
};

export default FieldControl;
