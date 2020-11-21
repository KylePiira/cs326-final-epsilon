# Setup

To get a basic version running locally you will need to have PostgreSQL installed and create the following tables:

```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE,
    password TEXT,
    reputation DOUBLE PRECISION DEFAULT 100,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIMZONE 'utc'),
    is_admin BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author UUID,
    parent UUID,
    body TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    votes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author UUID,
    title TEXT,
    url TEXT,
    investment TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    votes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE UserInvestments (
    author UUID,
    investment TEXT,
    type TEXT
);
```

Then run the following commands in bash on Linux, macOS, or WSL 2.

```bash
git clone git@github.com:KylePiira/cs326-final-epsilon.git
cd cs326-final-epsilon
npm install
DATABASE_URL='postgres://' SECRET='' npm run start
```

If you want to make changes to the HTML you will also need Python 3 and Jinja2 installed. Modify the files in `/templates` and run `python3 generate_html.py` to build the final HTML output.