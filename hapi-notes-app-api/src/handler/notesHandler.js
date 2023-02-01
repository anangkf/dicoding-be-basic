/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const checkAvailability = require('../libs/checkAvailability');
let notes = require('../mocks/notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, tags, body, createdAt, updatedAt,
  };

  notes.unshift(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: { ...newNote },
    });
    response.code = 201;
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal ditambahkan',
  });
  response.code = 500;
  return response;
};

const getAllNotesHandler = () => ({
  status: 'succes',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const [note] = notes.filter((val) => val.id === id);

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { payload } = req;
  const updatedAt = new Date().toISOString();
  const isNoteAvailable = checkAvailability(notes, id);

  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, ...payload, updatedAt };
    }
    return note;
  });

  if (isNoteAvailable) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui.',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  // const index = notes.findIndex((note) => note.id === id);

  // if (index !== -1) {
  //   notes.splice(index, 1);
  //   const response = h.response({
  //     status: 'success',
  //     message: 'Catatan berhasil dihapus',
  //   });
  //   response.code(200);
  //   return response;
  // }
  const isNoteAvailable = checkAvailability(notes, id);

  notes = notes.filter((n) => n.id !== id);

  if (isNoteAvailable) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus.',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal menghapus catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
