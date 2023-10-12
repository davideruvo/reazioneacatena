import React from "react";

import FieldControl from "#components/FieldControl";
import { ButtonBar, ButtonConfirmBar, Overlay } from "#components/Utils";
import styles from "#styles/listview.module.sass";

const ListView = ({
  fields,
  data,
  editable,
  actions,
  maxItems,
  offsetBottom,
}) => {
  const [currentItem, setCurrentItem] = React.useState(null);
  const [filter, setFilter] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);
  React.useEffect(() => {
    setFilteredData(
      data.filter(
        (x) =>
          Object.keys(x).filter(
            (k) =>
              //La ricerca avviene su tutti i campi testuali mostrati in lista
              fields.listView.includes(k) &&
              ["text", "longtext"].includes(
                fields.list.find((f) => f.key === k).type,
              ) &&
              x[k]?.toLowerCase().includes(filter.toLowerCase()),
          ).length > 0,
      ),
    );
  }, [filter, data]);

  const handleSearch = (value) => setFilter(value);
  const handleNew = () => setCurrentItem({});
  const handleCancel = () => setCurrentItem(null);
  const handleSave = (data) => {
    if (!actions) return;
    const actionName = data[fields.key] ? "save" : "new";
    if (typeof actions[actionName] === "function") actions[actionName](data);
    handleCancel();
  };
  const handleDelete = (data) => {
    if (typeof actions?.delete === "function") actions.delete(data);
    handleCancel();
  };

  return (
    <div className={styles.main}>
      {currentItem && <Overlay style={{ zIndex: 10 }} onClick={handleCancel} />}
      <ListViewSidebar
        fields={fields}
        fieldsList={fields.detailView}
        currentItem={currentItem}
        editable={editable}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      />
      <ListViewHeader fields={fields} fieldsList={fields.listView} />
      <ListViewActions
        handleSearch={handleSearch}
        handleNew={editable &&  (!maxItems || data.length < maxItems) ? handleNew : null}
      />
      <ListViewRows
        fields={fields}
        fieldsList={fields.listView}
        data={filteredData}
        offsetBottom={offsetBottom}
        onRowClick={(x) => setCurrentItem(x)}
      />
    </div>
  );
};

const ListViewHeader = ({ fields, fieldsList }) => {
  return (
    <ul className={styles.header}>
      <li className={styles.row}>
        <ul className={styles.fields}>
          {fieldsList
            .map((x) => fields.list.find((f) => f.key === x))
            .map((f) => (
              <li
                key={f.key}
                className={`${styles.field} ${styles[f.type]}`}
                style={{ width: f.width * 10 + "%" }}
              >
                {f.des}
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
};

const ListViewActions = ({ handleNew, handleSearch }) => {
  return (
    <ul className={styles.actions}>
      {handleSearch && (
        <li className={styles.row}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Cerca"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </li>
      )}
      {handleNew && (
          <li className={styles.row}>
            <ButtonBar
              size="s"
              buttons={[
                {
                  ico: "plus",
                  title: "Nuovo",
                  onClick: handleNew,
                },
              ]}
            />
          </li>,
        )}
    </ul>
  );
};

const ListViewRows = ({
  fields,
  fieldsList,
  data,
  onRowClick,
  offsetBottom,
}) => {
  const rowsRef = React.useRef();
  const rowsMaxHeight =
    window.innerHeight - rowsRef.current?.offsetTop - offsetBottom - 2;

  return (
    <ul
      ref={rowsRef}
      className={styles.rows}
      style={{ maxHeight: isNaN(rowsMaxHeight) ? null : rowsMaxHeight }}
    >
      {data.map((x, i) => (
        <li key={i} className={styles.row} onClick={() => onRowClick(x)}>
          <ListViewDetail fields={fields} fieldsList={fieldsList} data={x} />
        </li>
      ))}
    </ul>
  );
};

const ListViewSidebar = ({
  fields,
  fieldsList,
  currentItem,
  editable,
  handleSave,
  handleDelete,
  handleCancel,
}) => {
  return (
    <aside
      className={`${styles.sidebar} ${
        currentItem !== null ? styles.active : ""
      }`}
      style={{ zIndex: 11 }}
    >
      {currentItem && (
        <ListViewDetail
          fields={fields}
          fieldsList={fieldsList}
          data={currentItem}
          editMode={editable}
          fullWidth
          showTitle
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      )}
    </aside>
  );
};

const ListViewDetail = ({
  fields,
  fieldsList,
  data,
  fullWidth,
  editMode,
  showTitle,
  handleSave,
  handleDelete,
  handleCancel,
}) => {
  const initialValues = Object.assign(
    data,
    ...fieldsList.map((x) => ({ [x]: data[x] })),
  );
  const findErrors = (values) => {
    // /^[0-9]+$/
    // if (target.value !== "" regex && !regex.test(target.value)) return;
    return Object.keys(values).filter(
      (k) =>
        fields.list.find((f) => f.key === k)?.type !== "bool" &&
        !fields.list.find((f) => f.key === k)?.optional &&
        (typeof values[k] === "undefined" || values[k] === ""),
    );
  };
  const [detail, setDetail] = React.useState({
    values: initialValues,
    errors: findErrors(initialValues),
  });
  const [confirm, setConfirm] = React.useState(null);

  const handleChange = (key, target) => {
    
    setDetail((detail) => {
      const value = target.tagName === 'SELECT' ? target.options.filter(x  => x.selected)?[0].value === '1' :  target.value ;
      const newValues = { ...detail.values, [key]: value };
      return {
        values: newValues,
        errors: findErrors(newValues),
      };
    });
  };

  return (
    <>
      <ul className={styles.fields}>
        {showTitle && (fields.title || fields.subTitle) && (
          <TitleField
            data={data}
            titleField={fields.title}
            subTitleField={fields.subTitle}
          />
        )}
        {fieldsList
          .map((x) => fields.list.find((f) => f.key === x))
          .map((f) => (
            <li
              key={f.key}
              className={`${styles.field} ${styles[f.type]}`}
              style={{ width: fullWidth ? "100%" : f.width * 10 + "%" }}
            >
              <FieldControl
                field={f}
                value={editMode ? detail.values[f.key] : data[f.key]}
                editMode={editMode}
                handleChange={handleChange}
                hasError={detail.errors.includes(f.key)}
              />
            </li>
          ))}
      </ul>
      {editMode && (
        <>
          {!confirm && (
            <ButtonBar
              size="l"
              buttons={[
                { ico: "left-long", title: "Indietro", onClick: handleCancel },
                {
                  ico: "floppy-disk",
                  style: { width: "50%" },
                  title: "Salva",
                  disabled: detail.errors.length > 0,
                  onClick: () => handleSave(detail.values),
                },
                {
                  ico: "trash-can",
                  title: "Elimina",
                  hidden: typeof data[fields.key] === "undefined",
                  onClick: () => {
                    setConfirm({
                      text: `Vuoi eliminare l'elemento${
                        fields.title ? ` "${data[fields.title]}"` : ""
                      }?`,
                      action: () => handleDelete(detail.values),
                      cancel: () => setConfirm(null),
                    });
                  },
                },
              ]}
            />
          )}
          {confirm && (
            <ButtonConfirmBar
              text={confirm.text}
              onConfirm={confirm.action}
              onCancel={confirm.cancel}
            />
          )}
        </>
      )}
    </>
  );
};

const TitleField = ({ data, titleField, subTitleField }) => {
  return (
    <li className={styles.field} style={{ width: "100%" }}>
      {titleField && (
        <span style={{ display: "block", fontSize: "1.2rem" }}>
          {data[titleField]}
        </span>
      )}
      {subTitleField && (
        <span style={{ display: "block", fontSize: "0.7rem" }}>
          {data[subTitleField]}
        </span>
      )}
    </li>
  );
};

export default ListView;
