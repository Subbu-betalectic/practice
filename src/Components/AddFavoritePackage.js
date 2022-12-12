import React, { useEffect, useState } from "react";
import {
  TextInputBase,
  LabelBase,
  PickerRadioSimple,
  BetaForm as useBetaForm,
  TextAreaBase,
  ButtonBase,
} from "@reusejs/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPackages, savePackage } from "../services/PackageService";

const validation_constraints = {
  package: {
    presence: {
      allowEmpty: false,
      message: "^Please select package",
    },
  },
  packageDescription: {
    presence: {
      allowEmpty: false,
      message: "^Please enter package description",
    },
  },
};

export default function AddFavoritePackage() {
  const [favoritePackages, setFavoritePackages] = useState([]);
  const [refresh, setRefresh] = useState("");

  let navigate = useNavigate();

  const packagesForm = useBetaForm({
    search: "",
    package: {},
    packageDescription: "",
  });
  console.log("packageForm", packagesForm);

  const getFavoritePackageNames = (q) => {
    q = q ? q : "react";
    axios.get(`https://api.npms.io/v2/search?q=${q}`).then((response) => {
      let res = response.data.results.map((item) => {
        return { label: item.package.name, value: item.package.name };
      });
      setFavoritePackages(res);
      setRefresh(Date.now());
    });
  };

  useEffect(() => {
    getFavoritePackageNames();
    packagesForm.setValidationRules(validation_constraints);
  }, []);

  const saveDetails = () => {
    if (packagesForm.validate()) {
      const existingPackageArr = getPackages();
      const exists = existingPackageArr.find(
        (item) => item.package === packagesForm.getField("package")?.label
      );

      if (exists) {
        return packagesForm.setErrors({
          package: ["Selected package already present in fav"],
        });
      }

      const payload = {
        package: packagesForm.getField("package")?.label,
        packageDescription: packagesForm.getField("packageDescription"),
        id: Date.now(),
      };
      savePackage(payload);
      return navigate("/");
    }
  };

  return (
    <div className="m-20">
      <div>
        <TextInputBase
          labelBaseProps={{
            label: "Search for NPM Packages",
          }}
          type="text"
          placeholder="Search for NPM Packages"
          name="search"
          onChange={(val) => {
            getFavoritePackageNames(val);
          }}
          variant="primary"
        />
      </div>

      <div className="mt-6">
        <LabelBase label="Results" />
      </div>

      <div className="mt-4 h-36 overflow-scroll">
        <PickerRadioSimple
          dataSource={() => {
            return favoritePackages;
          }}
          defaultSelected={[packagesForm.getField("package")]}
          name="package"
          onChange={(val) => {
            packagesForm.setField("package", val);
          }}
          refresh={refresh}
          scrollableBaseProps={{
            scrollableBaseClasses: {
              textColor: "text-black",
              background: "bg-white",
              border: "border-0",
              borderRadius: 10,
              position: "z-50 block space-y-4 ",
            },
          }}
          radioBoxStyleClasses={{
            wrapper: "mt-0 flex",
            borderRadius: "rounded-full",
            border: "border border-blue-900 bg-white ",
            focus:
              "focus:border-gray-500 focus:ring-gray-400 checked:bg-blue-500 ",
            padding: "p-2",
            backgroundColor: "bg-white",
          }}
          radioOptionLabelClasses={{
            color: "text-black",
          }}
        />
      </div>

      {packagesForm.errors.get("package")?.length > 0 && (
        <div className="mt-2">
          <LabelBase
            label={packagesForm.errors.get("package")[0]}
            variant="error"
          />
        </div>
      )}

      <div className="mt-6">
        <TextAreaBase
          labelBaseProps={{
            label: "Why is this your fav?",
          }}
          placeholder="Why is this your fav ?"
          name="packageDescription"
          onChange={(val) => {
            packagesForm.setField("packageDescription", val);
          }}
          error={
            packagesForm.errors.get("packageDescription")?.length > 0 ? (
              <LabelBase
                label={packagesForm.errors.get("packageDescription")[0]}
                variant="error"
              />
            ) : null
          }
          variant="primary"
        />
      </div>

      <div className="mt-6 flex justify-end items-end">
        <ButtonBase
          label="Submit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            saveDetails();
          }}
        />
      </div>
    </div>
  );
}
