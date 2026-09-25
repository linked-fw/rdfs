import React from 'react';
import style from './LabelView.module.css';
import { linkedComponent, registerPackageExport } from '../package.js';
import { Resource } from '../shapes.js';

export const LabelView = linkedComponent(
  Resource.select((resource) => resource.label) as any,
  ({ linkedData: [label], source }) => {
    return (
      <span className={style.LabelView}>
        {label || source.id?.split(/[#,/]/).pop()}
      </span>
    );
  }
);

registerPackageExport(LabelView);
