/**
 * Enum representing the available routes in the application.
 */
export enum Routes {
  Home = 'Home',
  Login = 'Login',
  Discussion = 'Discussion',
  ConversationDetail = 'ConversationDetail',
  Homework = 'Homework',
  Info = 'Info',
  Note = 'Note',
  Punctuality = 'Punctuality',
  Schedule = 'Schedule',
}

/**
 * Represents the parameter types for the root stack navigation.
 */
export type RootStackParams = {
  [Routes.Home]: undefined;
  [Routes.Login]: undefined;
  [Routes.Discussion]: undefined;
  [Routes.Homework]: undefined;
  [Routes.Info]: undefined;
  [Routes.Note]: undefined;
  [Routes.Punctuality]: undefined;
  [Routes.Schedule]: undefined;
  [Routes.ConversationDetail]: {
    templateId: string,
    templateTitle: string,
    recipient: string,
  };
};

/**
 * Represents the navigation parameters for the root stack.
 */
export type NavigationParams = RootStackParams;

export default Routes
