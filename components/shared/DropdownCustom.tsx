import { Menu } from "@headlessui/react";
import { ReactNode, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SectionItem, useDocumentCurrentStore } from "../../store";

export default function DropdownCustom({
  items,
  button: Button,
  type,
  title,
  description,
}: {
  items: SectionItem[];
  button: ReactNode;
  type: "checkbox" | "radio";
  title?: string;
  description?: string;
}) {
  const [menuOpened, setMenuOpened] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();
  const documentCurrent = useDocumentCurrentStore.getState();
  const ref = useRef(null);
  const CheckItem = function ({ item }: { item: SectionItem }) {
    return (
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id={item.id}
            aria-describedby="candidates-description"
            type="checkbox"
            defaultChecked={item.defaultChecked}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            {...register(item.id)}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={item.id} className="font-medium text-gray-700">
            {item.label}
          </label>
          {item.description && (
            <p id="candidates-description" className="text-gray-500">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  const onSubmit: SubmitHandler<any> = function (data) {
    useDocumentCurrentStore.setState({
      sections: documentCurrent.sectionsAvailable.filter(
        (item) => data[item.id] === true
      ),
    });
    setMenuOpened(!menuOpened);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button ref={ref} onClick={() => setMenuOpened(!menuOpened)}>
          {Button}
        </Menu.Button>
      </div>

      {menuOpened && (
        <form
          className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-6 py-6 ">
            {title && (
              <label className="text-base font-medium text-gray-900">
                {title}
              </label>
            )}
            {description && (
              <p className="text-sm leading-5 text-gray-500">{description}</p>
            )}
            <fieldset className="mt-4">
              <Menu.Items
                className="mt-2 divide-y divide-gray-100 focus:outline-none "
                static
              >
                <div className="space-y-4">
                  {items.map((item) => (
                    <Menu.Item key={item.label} as="div">
                      {type === "checkbox" && <CheckItem item={item} />}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </fieldset>
          </div>
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse w-full">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setMenuOpened(!menuOpened)}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </Menu>
  );
}
