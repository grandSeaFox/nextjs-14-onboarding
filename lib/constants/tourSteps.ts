import { DriveStep } from 'driver.js';

export const homeTourSteps: DriveStep[] = [
  {
    element: '#nav-home',
    popover: {
      title: 'Home',
      description: 'This is the home page navigation item.',
      side: 'bottom'
    }
  },
  {
    element: '#nav-available-inputs',
    popover: {
      title: 'Available Inputs',
      description: 'Click here to understand the inputs you can use inside your own onboarding',
      side: 'right'
    }
  },
  {
    element: '#button-analytics',
    popover: {
      title: 'Test the analytics',
      description: 'Test the analytics sent to google analytics',
      side: 'bottom'
    }
  },
  {
    element: '#button-logout',
    popover: {
      title: 'You can logout here',
      side: 'right'
    }
  },
  {
    element: '#button-logout-1',
    popover: {
      title: 'Or here',
      side: 'right'
    }
  },
  {
    popover: {
      title: "<img src='https://i.imgur.com/3WpTnyA.gif' style='height: 202px; width: 270px;' alt='image-final-onboarding'/>",
      description: 'Good luck creating your own onboarding'
    }
  }
];