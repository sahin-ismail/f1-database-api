CREATE TABLE status (
	statusId INT primary key,
	status varchar (50)
);

CREATE TABLE sprint_results (
    resultId INT primary key,
    raceId INT,
    driverId INT,
    constructorId INT,
    number INT,
    grid INT,
    position INT,
    positionText VARCHAR (20),
    positionOrder INT,
    points INT,
    laps INT,
    time varchar(20),
    milliseconds BIGINT,
    fastestLap varchar (20),
    fastestLapTime varchar (20),
    statusId INT
);

CREATE TABLE circuits (
    circuitId INT primary key,
    circuitRef varchar (20),
    name varchar (50),
    location varchar (50),
    country varchar (50),
    lat FLOAT,
    lng FLOAT,
    alt varchar (20),
    url varchar (100)
);

CREATE TABLE constructor_results (
    constructorResultsId INT primary key,
    raceId INT,
    constructorId INT,
    points INT,
    status varchar (20)
);

CREATE TABLE constructors (
	constructorId INT primary key,
	constructorRef varchar (20),
	name varchar (50),
	nationality varchar (20),
	url varchar (100)
);

CREATE TABLE seasons (
	year smallint,
	url varchar (100)
);

CREATE TABLE results (
	resultId INT primary key,
	raceId INT,
	driverId INT,
	constructorId INT,
	number INT,
	grid INT,
	position INT,
	positionText varchar(20),
	positionOrder INT,
	points INT,
	laps INT,
	time varchar (20),
	milliseconds BIGINT,
	fastestLap INT,
	rank INT,
	fastestLapTime varchar (20),
	fastestLapSpeed FLOAT,
	statusId INT
);

CREATE TABLE races (
    raceId INT primary key,
    year SMALLINT,
    round INT,
    circuitId INT,
    name varchar (50),
    date DATE,
    time varchar(20),
    url varchar (100),
    fp1_date varchar(20),
    fp1_time varchar(20),
    fp2_date varchar(20),
    fp2_time varchar(20),
    fp3_date varchar(20),
    quali_date varchar(20),
    quali_time varchar(20),
    sprint_date varchar(20),
    sprint_time varchar(20)
);

CREATE TABLE drivers (
    driverId INT primary key,
    driverRef varchar (20),
    number INT,
    code varchar (20),
    forename varchar (20),
    surname varchar (30),
    dob DATE,
    nationality varchar (20),
    url varchar (100)
);

CREATE TABLE qualifying (
    qualifyId INT primary key,
    raceId INT,
    driverId INT,
    constructorId INT,
    number INT,
    position INT,
    q1 varchar(20),
    q2 varchar(20),
    q3 varchar(20)
);

CREATE TABLE pit_stops (
    raceId INT,
    driverId INT,
    stop INT,
    lap INT,
    time varchar(20),
    duration varchar(20),
    milliseconds BIGINT
);

CREATE TABLE lap_times (
    raceId INT,
    driverId INT,
    lap INT,
    position INT,
    time varchar(20),
    milliseconds BIGINT
);

CREATE TABLE driver_standings (
    driverStandingsId INT primary key,
    raceId INT,
    driverId INT,
    points INT,
    position INT,
    positionText varchar(20),
	wins INT
);

CREATE TABLE constructor_standings (
    constructorStandingsId INT primary key,
    raceId INT,
    constructorId INT,
    points INT,
    position INT,
    positionText varchar(20),
	wins INT
);

CREATE INDEX idx_lap_times_raceId ON lap_times(raceId);
CREATE INDEX idx_races_circuitId ON races(circuitId);
CREATE INDEX idx_lap_times_milliseconds_raceId ON lap_times USING btree (raceId, milliseconds);