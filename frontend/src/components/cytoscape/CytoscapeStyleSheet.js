export const selectedLabel = {
  node: {},
  edge: {},
};

const getLabel = (ele, captionProp) => {
  if (captionProp === 'gid') {
    if (ele.isNode()) {
      selectedLabel.node[ele.data('label')] = 'gid';
    } else {
      selectedLabel.edge[ele.data('label')] = 'gid';
    }
    return `[ ${ele.data('id')} ]`;
  } if (captionProp === 'label') {
    if (ele.isNode()) {
      selectedLabel.node[ele.data('label')] = 'label';
    } else {
      selectedLabel.edge[ele.data('label')] = 'label';
    }
    return `[ :${ele.data('label')} ]`;
  }
  const props = ele.data('properties');
  if (props === undefined || props[captionProp] === undefined) {
    return '';
  }
  if (ele.isNode()) {
    selectedLabel.node[ele.data('label')] = captionProp;
  } else {
    selectedLabel.edge[ele.data('label')] = captionProp;
  }
  return props[captionProp];
};

export const stylesheet = [
  {
    selector: 'node',
    style: {
      width(ele) { return ele.data('size') != null ? ele.data('size') : 1; },
      height(ele) { return ele.data('size') != null ? ele.data('size') : 1; },
      label(ele) {
        const captionProp = ele.data('caption');
        return getLabel(ele, captionProp);
      },
      'background-color': (ele) => {
        let bc;
        if (ele.data('backgroundColor') != null) {
          bc = ele.data('backgroundColor');
        } else {
          bc = '#FF0000';
        }
        return bc;
      },
      'border-width': '3px',
      'border-color': (ele) => {
        let bc;
        if (ele.data('borderColor') != null) {
          bc = ele.data('borderColor');
        } else {
          bc = '#FF0000';
        }
        return bc;
      },
      'border-opacity': 0.6,
      'text-valign': 'center',
      'text-halign': 'center',
      color(ele) { return ele.data('fontColor') != null ? ele.data('fontColor') : '#FFF'; },
      'font-size': '10px',
      'text-wrap': 'ellipsis',
      'text-max-width': (ele) => (ele.data('size') != null ? ele.data('size') : 1),
    },
  },
  {
    selector: 'node.highlight',
    style: {
      'border-width': '6px',
      'border-color': '#B2EBF4',
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '6px',
      'border-color': '#B2EBF4',
    },
  },
  {
    selector: 'edge',
    style: {
      width(ele) { return ele.data('size') != null ? ele.data('size') : 1; },
      label(ele) { const captionProp = ele.data('caption'); return getLabel(ele, captionProp); },
      'text-background-color': '#FFF',
      'text-background-opacity': 1,
      'text-background-padding': '3px',
      'line-color': (ele) => {
        let lc;
        if (ele.data('backgroundColor') != null) {
          lc = ele.data('backgroundColor');
        } else {
          lc = '#FF0000';
        }
        return lc;
      },
      'target-arrow-color': (ele) => {
        let tac;
        if (ele.data('backgroundColor') != null) {
          tac = ele.data('backgroundColor');
        } else {
          tac = '#FF0000';
        }
        return tac;
      },
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      color(ele) { return ele.data('fontColor') != null ? ele.data('fontColor') : '#FFF'; },
      'font-size': '10px',
      'text-rotation': 'autorotate',
    },
  },
  {
    selector: 'edge.highlight',
    style: {
      width(ele) { return ele.data('size') != null ? ele.data('size') : 1; },
      'line-color': '#B2EBF4',
      'target-arrow-color': '#B2EBF4',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
  {
    selector: 'edge:selected',
    style: {
      width(ele) { return ele.data('size') != null ? ele.data('size') : 1; },
      'line-color': '#B2EBF4',
      'target-arrow-color': '#B2EBF4',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
];
