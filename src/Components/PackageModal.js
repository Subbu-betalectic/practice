import React from "react";
import { ThemeProvider, LabelBase, ButtonBase } from "@reusejs/react";
import newTheme from "./variants";

export default function PackageModal(props) {
  return (
    <ThemeProvider value={newTheme}>
      <div>
        <div className="mt-8">
          <LabelBase label="Are you sure you want to delete ?" />
        </div>
        <div className="flex items-center justify-center gap-5 my-6">
          <ButtonBase
            label="Cancel"
            variant="redButton"
            onClick={() => {
              props.onAction("close");
            }}
          />
          <ButtonBase
            label="Yes"
            variant="greenButton"
            onClick={() => props.onAction("yes")}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
