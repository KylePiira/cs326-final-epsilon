# Database

## Users Table

```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT,
    password TEXT,
    reputation DOUBLE PRECISION DEFAULT 0,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    is_admin BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## Comments Table

```sql
CREATE TABLE Comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author UUID,
    parent UUID,
    body TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    votes INTEGER DEFAULT 0,
    score DOUBLE PRECISION DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## Submissions Table

```sql
CREATE TABLE Submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author UUID,
    title TEXT,
    url TEXT,
    investment TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    votes INTEGER DEFAULT 0,
    score DOUBLE PRECISION DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## User Investments Table

```sql
CREATE TABLE UserInvestments (
    author UUID,
    investment TEXT,
    type TEXT
);
```
