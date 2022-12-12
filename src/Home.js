import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ButtonBase,
  LabelBase,
  DataTableBase,
  ModalBase,
} from "@reusejs/react";

import PackageModal from "./Components/PackageModal";
import { deletePackage, getPackages } from "./services/PackageService";

export default function Home() {
  const tableRef = useRef();
  const [favPackages, setFavPackages] = useState([]);

  const openModal = async (id) => {
    const result = await ModalBase({
      content: PackageModal,
      backgroundColor: "bg-white",
      backgroundOpacity: "opacity-50",
      modalBaseClasses: {
        border: "border-gray-500 border rounded-lg",
        font: "text-black",
        alignment: "z-50 flex flex-col justify-center overflow-visible",
      },
    });

    if (result === "yes") {
      deletePackage(id);
      loadPackages();
      tableRef.current.refresh();
    }
  };

  const loadPackages = () => {
    const existingPackages = getPackages();
    setFavPackages(existingPackages);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  return (
    <div className="m-20">
      <div className="flex items-center justify-between">
        <LabelBase label="Welcome to Favorite NPM packages" variant="primary" />
        {favPackages.length > 0 && (
          <Link to="/addFavoritePackage">
            <ButtonBase label="Add Fav" />
          </Link>
        )}
      </div>
      {favPackages.length === 0 ? (
        <div className="w-full h-60 border border-slate-400 rounded mt-10 flex flex-col items-center justify-center">
          <div className="mb-5">
            <LabelBase label="You don't have any favs yet. Please add." />
          </div>
          <Link to="/addFavoritePackage">
            <ButtonBase label="Add Fav" />
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <DataTableBase
            ref={tableRef}
            sortColumn={0}
            config={{
              filterable: false,
              columns: [
                {
                  label: "Package Name",
                  identifier: "name",
                  resolver: (d) => {
                    return d.package;
                  },
                  sortable: false,
                },
                {
                  label: "Actions",
                  identifier: "action",
                  resolver: (d) => {
                    return (
                      <div onClick={() => openModal(d.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 cursor-pointer"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    );
                  },
                  sortable: false,
                },
              ],
            }}
            dataSource={() => {
              return {
                data: favPackages,
                pagination: {
                  total: favPackages.length,
                },
              };
            }}
          />
        </div>
      )}
    </div>
  );
}
