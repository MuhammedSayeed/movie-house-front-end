
import { IEDIT_EMAIL_INPUTS, IEDIT_NAME_INPUTS, IEDIT_PASSWORD_INPUTS, IGenre, ILink, ILOGIN_FROM, ISHOW_TYPES, ISIGNUP_FROM } from "../interfaces";

// Navbar Links 
export const NavLinks: ILink[] = [
    {
        label: "Home",
        path: "/",
        privateRoute: false
    },
    {
        label: "Movies",
        path: "/show/movie/28",
        privateRoute: false

    },
    {
        label: "TvShow",
        path: "/show/tv/10759",
        privateRoute: false

    },
    {
        label: "Favorites",
        path: "/favorites",
        privateRoute: true

    },
    {
        label: "Recommendations",
        path: "/recommendations",
        privateRoute: true
    }
]

// GENRES
export const MoviesGenres: IGenre[] = [
    {
        name: 'Action',
        id: 28,
        active: true,
        style: "col-start-1 col-end-4",

    },
    {
        name: 'Comedy',
        id: 35,
        active: false,
        style: "col-start-1 col-end-2"

    },
    {
        name: 'Horror',
        id: 27,
        active: false,
        style: "col-span-2"


    }, {
        name: 'Adventure',
        id: 12,
        active: false,
        style: "col-start-1 col-end-4"


    },
    {
        name: 'Crime',
        id: 80,
        active: false,
        style: "col-start-1 col-end-3"


    },
    {
        name: 'War',
        id: 10752,
        active: false,
        style: "col-start-3 col-end-4"


    },
    {
        name: 'Animation',
        id: 16,
        active: false,
        style: "col-start-1 col-end-4"
    },
]
export const TvGenres: IGenre[] = [
    {
        name: 'Action',
        id: 10759,
        active: true,
        style: "col-start-1 col-end-4"
    },
    {
        name: 'Comedy',
        id: 35,
        active: false,

    },
    {
        name: 'Mystery',
        id: 9648,
        active: false,

    },
    {
        name: 'Crime',
        id: 80,
        active: false,

    },
    {
        name: 'Animation',
        id: 16,
        active: false,
        style: "col-start-1 col-end-4"

    },
    {
        name: 'War',
        id: 10768,
        active: false,
        style: "col-start-1 col-end-4"
    },
]

// SHOW TYPES 

export const SHOW_TYPES: ISHOW_TYPES[] = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Movie",
        value: "movie"
    },
    {
        label: "TV Show",
        value: "tv"
    }
]

// Forms
export const LOGIN_INPUTS_FORM: ILOGIN_FROM[] = [
    {
        name: "email",
        type: "email",
        placeholder: "Email"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password"
    }
]
export const SIGNUP_INPUTS_FORM: ISIGNUP_FROM[] = [
    {
        name: "name",
        type: "text",
        placeholder: "Name"
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password"
    }
]

export const DEFAULT_PROFILE_IMG = "https://res.cloudinary.com/dndjbkrcv/image/upload/v1737952152/2-2-2_newymh_auglvz.png"


// STYLES

export const toastStyle = {
    backgroundColor: "#1c163d",
    color: "white",
    fontWeight: "600",
    border: "1px solid white"
}

export const gridStyle = {
    backgroundImage: `
      linear-gradient(rgba(67, 58, 108, 0.068) 1px, transparent 1px),
      linear-gradient(90deg, rgba(67, 58, 108, 0.068) 1px, transparent 1px)
    `,
    backgroundSize: `30px 30px`,
};

export const EDIT_NAME_INPUTS: IEDIT_NAME_INPUTS[] = [
    {
        id: "edit-name",
        label: "Name",
        name: "name",
        type: "text",
    },
    {
        id: "edit-name-password",
        label: "Password",
        name: "password",
        type: "password",
    }
];

export const EDIT_EMAIL_INPUTS: IEDIT_EMAIL_INPUTS[] = [
    {
        id: "edit-email",
        label: "Email",
        name: "email",
        type: "text",
    },
    {
        id: "edit-email-password",
        label: "Password",
        name: "password",
        type: "password",
    }
];

export const EDIT_PASSWORD_INPUTS: IEDIT_PASSWORD_INPUTS[] = [
    {
        id: "edit-password-current",
        label: "Current Password",
        name: "password",
        type: "password",
    },
    {
        id: "edit-password-new",
        label: "New Password",
        name: "newpassword",
        type: "password",
    }
];