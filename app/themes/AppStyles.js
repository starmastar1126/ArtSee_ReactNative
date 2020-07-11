// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

import Metrics from './Metrics'
import Colors from './Colors'

const AppStyles = {
  transparentHeader: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  // TODO make it better
  inputIcon: {
    alignSelf: 'center',
    fontSize: Metrics.icons.md,
    color: Colors.inputIcon,
  },
  primaryIcon: {
    alignSelf: 'center',
    fontSize: Metrics.icons.md,
    color: Colors.primary,
  },
  radioOptionIcon: {
    fontSize: Metrics.icons.md,
    color: Colors.primary,
    paddingHorizontal: Metrics.baseMargin,
  },
}

export default AppStyles
