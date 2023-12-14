const { nanoid } = require('nanoid');
const { Storage } = require('@google-cloud/storage');
const db = require('./db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const maxExpire = 3 * 24 * 60 * 60;
const createToken = (id) => jwt.sign({id}, process.env.SECRET_STRING, {
    expireIn: maxExpire,
});
const createAdminToken = (id) => jwtt.sign({id}, process.env.SECRET_STRING_ADMIN, {
expireIn: maxExpire,
});

exports.getAllMembers = async(req, res) => {
    const result = await db.promise().query('SELECT * FROM users');
    res.send(result[0]);
};

exports.signupPost = async(req, res) => {
    const {
        username,
        password,
    } = req.body;

    const id = nanoid(16);

    if (username === '') {
        const response = res.send({
            status: 'Gagal',
            message: 'Gagal menambahkan anggota. Tambahkan username!',
        });
        response.status(400);
        return response;
    }
    if (username.length < 6) {
        const response = res.send({
            status: 'Gagal',
            message: 'Username harus lebih dari 6 karakter',
        });
        response.status(400);
        return response;
    }
    if (password === '') {
        const response = res.send({
            status: 'Gagal',
            message: 'Tambahkan password anda',
        });
        response.status(400);
        return response;
    }
    if (password.length < 8) {
        const response = res.send({
            status: 'Gagal',
            message: 'Password harus lebih dari 8 karakter',
        });
        response.status(400);
        return response;
    }

    const [rows] = awaitdb.promise().query(`SELECT * FROM users WHERE username = '$(req.body.username)'`);
    if (rows.length !==0) {
        return res.status(500).json({message: 'Username sudah ada'});
    }

    const salt = await bcrypt.genSalt();
    const hasehdPassword = await bcrypt.hash(password, salt);

    await db.promise().query(`INSERT INTO users VALUES('${id}', '${username}, '${hashedPassword})`);

    const response = res.send({
        status: 'Berhasil',
        message: 'Anggota berhasil ditambahkan',
        data: {
            userId: id,
        },
    });
    response.status(201);
};

exports.getNumberById = async(req, res) => {
    const [rows] = await db.promise().query(`SELECT * FROM users WHERE id = ?`, [req.params.id]);

    if (rows.length === 0) {
        return res.status(404).json({message: 'User tidak dapat ditemukan'});
    }

    const response = res.status(200).json({message: 'data found', data: rows[0]});
    return response;
};

exports.editMemberById = async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    if (username === '') {
        const response = res.send({
            status: 'Gagal',
            message: 'Gagal mengubah data user. Masukan username',
        });
        response.status(400);
        return response;
    }

    const [rows] = await db.promise().query(`SELECT * FROM users WHERE id = ?`, [req.params.id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Id user tidak ditemukan'});
    }

    const [check] = await db.promise().query(`SELECT * FROM users WHERE username = ?`, [req.body.username]);
    if (check.length === 0) {
        const salt = await bcrypt.genSalt();
        const hasehdPassword = await bcrypt.hash(password, salt);

        await db.promise().query(`UPDATE users SET username = ?, password = ? WHERE id = ?`, [username, hasehdPassword, req.params.id]);
        return res.status(200).json(
            {message: 'Data berhasil diubah', id: req.params.id},
        );
    }

    if (check.rows !== 0 && check[0].id !== req.params.id) {
        return res.status(500).json({message: 'Username sudah digunakan'});
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.promise().query(`UPDATE users SET username = ?, password = ? WHERE id = ?`, [username, hashedPassword, req.params.id]);
    return res.status(200).json(
        {message: 'Data berhasil diubah', id: req.params.id},
    );
};

exports.login = async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    if (username === '') {
        const response = res.send({
            status: 'Gagal',
            message: 'masukan username',
        });
        response.status(400);
        return response;
    }
    if (username.length < 6) {
        const respone = res.send({
            status: 'Gagal',
            message: 'username harus memiliki 6 atau lebih karakter',
        });
        respone.status(400);
        return respone;
    }

    const [rows] = await db.promise().query(`SELECT * FROM users WHERE username = '${req.body.username}'`);
    if (rows.length !== 0) {
        const auth = bcrypt.compareSync(password, rows[0].password);
        if (auth) {
            const token = createToken(rows[0].id);
            res.cookie('jwt', token, {httpOnly: false, maxAge: maxExpire * 1000 });
            const response = res.status(200).json({
                message: 'Logged in',
                user_id: rows[0].id,
            });
            return response;
        }
        const response = res.status(404).json({message: 'Password salah'});
        return response;
    }
    const response = res.status(404).json({message: 'Username tidak tersedia'});
    return response;
};

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.send({ message: 'Logged out' });
};












const loginHandler = (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'user' && password === 'password') {
      res.status(200).json({ message: 'Login berhasil' });
    } else {
      res.status(401).json({ message: 'Login gagal' });
    }
  };