/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  D3_FORMAT_OPTIONS,
  D3_FORMAT_DOCS,
  sections,
  getStandardizedControls,
} from '@superset-ui/chart-controls';
import { countryOptions } from './countries';
import { javascript } from './plugin/controls/code';

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'select_country',
            config: {
              type: 'SelectControl',
              label: t('Country'),
              default: null,
              choices: countryOptions,
              description: t('Which country to plot the map for?'),
              validators: [validateNonEmpty],
            },
          },
        ],
        ['entity'],
        ['metric'],
        ['orderby'],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      tabOverride: 'customize',
      controlSetRows: [
        [
          {
            name: 'number_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Number format'),
              renderTrigger: true,
              default: 'SMART_NUMBER',
              choices: D3_FORMAT_OPTIONS,
              description: D3_FORMAT_DOCS,
            },
          },
        ],
        ['linear_color_scheme'],
        [
          {
            name: 'displayLegend',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Legend'),
              renderTrigger: true,
              default: 'None',
              choices: [
                'None',
                'Top',
                'TopLeft',
                'TopRight',
                'Bottom',
                'BottomLeft',
                'BottomRight',
              ].map(v => [v, v]),
            },
          },
          {
            name: 'displayLegendOrientation',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Orientation'),
              renderTrigger: true,
              default: 'Horizontal',
              choices: ['Horizontal', 'Vertical'].map(v => [v, v]),
              description: t('Legend Orientation'),
              visibility: ({ controls }: any) =>
                controls.displayLegend.value !== 'None',
            },
          },
          {
            name: 'displayLegendFontSize',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Font Size'),
              renderTrigger: true,
              default: 10,
              choices: [8, 9, 10, 11, 12, 13, 14].map(v => [v, v]),
              visibility: ({ controls }: any) =>
                controls.displayLegend.value !== 'None',
            },
          },
        ],
      ],
    },
    {
      label: t('Javascript'),
      expanded: true,
      controlSetRows: [[javascript]],
    },
  ],
  controlOverrides: {
    entity: {
      label: t('ISO 3166-2 Codes'),
      description: t(
        'Column containing ISO 3166-2 codes of region/province/department in your table.',
      ),
    },
    metric: {
      label: t('Metric'),
      description: t('Metric to display bottom title'),
    },
    linear_color_scheme: {
      renderTrigger: false,
    },
  },
  formDataOverrides: formData => ({
    ...formData,
    entity: getStandardizedControls().shiftColumn(),
    metric: getStandardizedControls().shiftMetric(),
  }),
};

export default config;
